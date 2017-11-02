/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		render: function () {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<button
						className="clear-completed"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</button>
				);
			}

			var nowShowing = this.props.nowShowing;
			return (
				<footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						<li>
							<a
								href="#/"
								className={classNames({selected: nowShowing === app.SHORT_LIST})}>
									快捷清单
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/grass-catcher-list"
								className={classNames({selected: nowShowing === app.GRASS_CATCHER_LIST})}>
									集草器
                                <span className="grass-catcher-items">{this.props.inGrassCatcherCount}</span>
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/completed-list"
								className={classNames({selected: nowShowing === app.COMPLETED_LIST})}>
									已完成
							</a>
						</li>
					</ul>
					{clearButton}
				</footer>
			);
		}
	});
})();
