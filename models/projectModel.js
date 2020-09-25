"use strict";
const db = require("./conn");
const bcrypt = require("bcryptjs");


class projectModel {
    constructor(id,name,project){
        this.id = id;
        this.name = name;
        this.project = project;
    }
    static async getAll(id){
        try{
            const response = await db.any(`SELECT * FROM projects WHERE users_id = $1;`,[id]);
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async submitProject(id,project){
        
        try{
            const response = await db.result(`INSERT INTO projects (users_id,name)
            VALUES ($1,$2);`,[id,project]);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async currentProjectNumber(projectID){
        
        try{
            const response = await db.result(`UPDATE currentproject SET current_project_num = $1 WHERE id =1`,[projectID]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async getprojectID(){
        
        try{
            const response = await db.one(`SELECT current_project_num FROM currentproject WHERE id =1;`);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async deleteProject(id){
        
        try{
            const response = await db.one(`DELETE FROM projects WHERE id =$1;`, [id]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    


}


module.exports = projectModel;