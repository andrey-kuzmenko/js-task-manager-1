"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_services_1 = require("../../services/task.services");
var user_services_1 = require("../../services/user.services");
var router_1 = require("@angular/router");
var TasksComponent = (function () {
    function TasksComponent(taskService, router) {
        var _this = this;
        this.taskService = taskService;
        this.router = router;
        // this.tasks = [
        //     {
        //         "title": "Walk the dog",
        //         "isDone": false
        //     },
        //     {
        //         "title": "Go to shopping",
        //         "isDone": false
        //     },
        //     {
        //         "title": "Go out for dinner",
        //         "isDone": false
        //     }
        // ]
        this.taskService
            .getTasks()
            .subscribe(function (tasks) {
            console.log(tasks);
            _this.tasks = tasks;
            _this.taskService.tasksUpdated.emit(_this.tasks);
        });
    }
    TasksComponent.prototype.updateStatus = function (task) {
        var _this = this;
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateStatus(_task)
            .subscribe(function (data) {
            task.isDone = !task.isDone;
            console.log('updated inside tasks component');
            _this.taskService.tasksUpdated.emit(_this.tasks);
        });
    };
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        console.log(this.title);
        var newTask = {
            _id: null,
            title: this.title,
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(function (savedTask) {
            _this.tasks.push(savedTask);
            _this.title = '';
            _this.taskService.tasksUpdated.emit(_this.tasks);
        });
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var _this = this;
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                        _this.taskService.tasksUpdated.emit(_this.tasks);
                    }
                }
            }
        });
    };
    TasksComponent.prototype.ngOnInit = function () {
        user_services_1.UserService.checkCredentials(this.router);
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: 'tasks.component.html',
    }),
    __metadata("design:paramtypes", [task_services_1.TaskService, router_1.Router])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map