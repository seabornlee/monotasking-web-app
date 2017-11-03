/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
	'use strict';

	app.SHORT_LIST = 'short_list';
	app.GRASS_CATECHER_LIST = 'grass_catcher_list';
	app.COMPLETED_LIST = 'completed_list';
    app.PANORAMA = 'panorama';
    app.MONOTASKING = 'monotasking';
	var TodoFooter = app.TodoFooter;
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	var TodoApp = React.createClass({
		getInitialState: function () {
			return {
				nowShowing: app.SHORT_LIST,
				editing: null,
                newTodo: '',
                status: app.PANORAMA,
                countdown: '',
                countdownTimer: null
			};
		},

		componentDidMount: function () {
			var setState = this.setState;
			var router = Router({
				'/': setState.bind(this, {nowShowing: app.SHORT_LIST}),
				'/grass-catcher-list': setState.bind(this, {nowShowing: app.GRASS_CATCHER_LIST}),
				'/completed-list': setState.bind(this, {nowShowing: app.COMPLETED_LIST})
			});
			router.init('/');
		},

		handleChange: function (event) {
			this.setState({newTodo: event.target.value});
		},

		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = this.state.newTodo.trim();

			if (val) {
				this.props.model.addTodo(val);
				this.setState({newTodo: ''});
			}
		},

		toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		},

		toggle: function (todoToToggle) {
			this.props.model.toggle(todoToToggle);
		},

        move: function (todo) {
            let moved = this.props.model.move(todo);
            if (!moved) {
                alert('快捷清单已满!');
            }
        },

		destroy: function (todo) {
			this.props.model.destroy(todo);
		},

		edit: function (todo) {
			this.setState({editing: todo.id});
		},

		save: function (todoToSave, text) {
			this.props.model.save(todoToSave, text);
			this.setState({editing: null});
		},

		cancel: function () {
			this.setState({editing: null});
		},

		clearCompleted: function () {
			this.props.model.clearCompleted();
		},

        ensureNotificationPermissionGranted: (callback) => {
            if (("Notification" in window) &&  Notification.permission !== "granted") {
                Notification.requestPermission(function (permission) {
                    console.log(permission)
                    callback();
                });
            } else {
                callback();
            }
        },

        toggleAlarm: function() {
            if (this.state.status === app.PANORAMA) {
                this.ensureNotificationPermissionGranted(() => {
                    let countdownTimer = countdown(this.getAlarmTime(), (ts) => {
                        let isTimeUp = ts.minutes === 0 && ts.seconds === 0;
                        if (isTimeUp) {
                            this.stopTimer(this);
                            this.notify();
                        } else {
                            this.setState({
                                countdown: ts.toString()
                            });
                        }
                    });
                    this.setState({
                        status: app.MONOTASKING,
                        countdownTimer: countdownTimer
                    });
                });
            } else {
                this.stopTimer(this);
            }
        },

        stopTimer: (that) => {
            window.clearInterval(that.state.countdownTimer);
            that.setState({
                status: app.PANORAMA,
                countdown: ''
            });
        },

        notify: () => {
            let msg = "恭喜你完成一个单核时段，现在进入全景时段！";
            if (("Notification" in window) && Notification.permission === "granted") {
                new Notification(msg);
            } else {
                alert(msg);
            }
        },

        getAlarmTime: function() {
            let current = new XDate();
            let minutes = current.getMinutes();
            if (minutes >=0 && minutes < 5) {
                return current.setMinutes(30).setSeconds(0);
            }

            if (minutes >= 5 && minutes < 35) {
                return current.addHours(1).setMinutes(0).setSeconds(0);
            }

            if (minutes >= 35 && minutes <= 59) {
                return current.addHours(1).setMinutes(30).setSeconds(0);
            }
        },

		render: function () {
			var footer;
			var main;
			var todos = this.props.model.todos;

			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
				case app.SHORT_LIST:
					return !todo.completed && todo.status === 'in_short_list';
				case app.GRASS_CATCHER_LIST:
					return !todo.completed && todo.status === 'in_grass_catcher_list';
                case app.COMPLETED_LIST:
                    return todo.completed;
				default:
					return true;
				}
			}, this);

			var todoItems = shownTodos.map(function (todo) {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={this.toggle.bind(this, todo)}
						onDestroy={this.destroy.bind(this, todo)}
                        movable={todo.status === 'in_grass_catcher_list'}
                        onMove={this.move.bind(this, todo)}
						onEdit={this.edit.bind(this, todo)}
						editing={this.state.editing === todo.id}
						onSave={this.save.bind(this, todo)}
						onCancel={this.cancel}
					/>
				);
			}, this);

			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;
            let inGrassCatcherCount = todos.filter(t => t.status === 'in_grass_catcher_list').length;

			if (activeTodoCount || completedCount) {
				footer =
					<TodoFooter
						count={activeTodoCount}
						completedCount={completedCount}
                        inGrassCatcherCount={inGrassCatcherCount}
						nowShowing={this.state.nowShowing}
						onClearCompleted={this.clearCompleted}
					/>;
			}

			if (todos.length) {
				main = (
					<section className="main">
						<input
							className="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul className="todo-list">
							{todoItems}
						</ul>
					</section>
				);
			}

			return (
				<div>
					<header className="header">
						<h1>单核工作法</h1>
						<input
							className="new-todo"
							placeholder="你想完成什么？"
							value={this.state.newTodo}
							onKeyDown={this.handleNewTodoKeyDown}
							onChange={this.handleChange}
							autoFocus={true}
						/>
					</header>
                    <div className={this.state.countdown === '' ? 'hidden' : 'timer'}>{this.state.countdown}</div>
                    <div className="action-button">
                        <button className={this.state.status === app.PANORAMA ? "start-alarm" : "stop-alarm"} onClick={this.toggleAlarm} disabled={todos.filter((t) => t.status === 'in_short_list').length === 0 ? 'disabled' : ''}>{this.state.status === app.PANORAMA ? '开始' : '停止'}</button>
                    </div>
					{main}
					{footer}
				</div>
			);
		}
	});

	var model = new app.TodoModel('react-todos');

	function render() {
		React.render(
			<TodoApp model={model}/>,
			document.getElementsByClassName('todoapp')[0]
		);
	}

	model.subscribe(render);
	render();
})();
