/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
	'use strict';

	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};

	app.TodoModel.prototype.subscribe = function (onChange) {
		this.onChanges.push(onChange);
	};

	app.TodoModel.prototype.inform = function () {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { cb(); });
	};

	app.TodoModel.prototype.addTodo = function (title) {
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
            status: this.getStatus(),
            completed: false
		});

		this.inform();
	};

    app.TodoModel.prototype.getStatus = function () {
        if (this.isShortListFull()) {
            return 'in_grass_catcher_list';
        }

        return 'in_short_list';
    };

    app.TodoModel.prototype.isShortListFull = function() {
        return this.todos.filter(function(todo) {
            return todo.status === 'in_short_list';
        }).length === 5;
    }

	app.TodoModel.prototype.destroy = function (todo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		this.inform();
	};

	app.TodoModel.prototype.save = function (todoToSave, text) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.inform();
	};

	app.TodoModel.prototype.clearCompleted = function () {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.inform();
	};

    app.TodoModel.prototype.toggle = function(todoToToggle) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ? todo : Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.inform();
    }

})();
