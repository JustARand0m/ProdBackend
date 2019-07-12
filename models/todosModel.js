'use strict'

const dbConnection = require('../config/dbConnection');
const mysql = require('mysql');

const con = dbConnection();

con.on('connection', (connection) => {
    console.log('new connection is made: ' + connection.threadId);
})

module.exports = {
    /**
     * This function returns all todos from the database, if an error occours the error will be found 
     * in the rejected error. 
     */
    getAllTodos: function() {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM todos', (error, result, fields) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },

    /**
     * This method returns the specific todo with the the given ID, if an error occours, the error will be 
     * found in the rejected error.
     * 
     * @param {number} id 
     */
    getTodo: function(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM todos WHERE id = ${mysql.escape(id)}`, (error, result, fields) => {
                if(error) {
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },

    /**
     * This method inserts a todo object into the database, if an error occours, the error will be found
     * in the rejected error.
     * The todo object should contain the following attributes:
     * id: number
     * isDone: boolean,
     * todoMsg: string,
     * importance: int,
     * endDate: Date
     *  
     * @param {object} todo 
     */
    saveTodo: function(todo) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO todos(id, isDone, todoMsg, importance, endDate) 
                       VALUES (${mysql.escape(todo.id)}, ${mysql.escape(todo.isDone)}, 
                        ${mysql.escape(todo.todoMsg)}, ${mysql.escape(todo.importance)}, 
                        ${mysql.escape(todo.endDate)})`, 
                       (error, result) => {
                if(error) {
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }, 

    /**
     * This function deletes the todo in the database where the id is equals the id given
     * 
     * @param {number} id 
     */
    deleteTodo: function(id) {
        return new Promise((resolve, reject) => {
            con.query(`DELETE FROM todos WHERE id = ${id}`, (error, result) => {
                if(error) {
                    reject(error);
                }else{
                    resolve(result);
                }
            })
        })
    }
}