const pool = require("../config/db");
const {genSaltSync , hashSync}  = require('bcrypt');


module.exports={
    create: (data, callback) =>{
    
        const salt = genSaltSync(10);
        data.password = hashSync(data.password,salt);

         pool.query(
            `insert into mobilicts.person ( first_name, last_name, email, password, mobile, user_id ) VALUES ( $1,$2,$3,$4,$5,$6 ) returning * `
            ,
        [
            data.first_name,
            data.last_name,
            data.email,
            data.password,
            data.mobile,
            data.user_id
        ]
            ,
        (err, results,field) =>{
            if(err){
            return  callback(err);
            }
            return callback(null,results.rows);
            }
        );
    },
    dashboard : (data , callback)=>{

        pool.query(`Select * from mobilicts.person where user_id =$1`
        ,[
            data.id
        ],
        (err, results)=>{
            if(err){
                return callback(err);
            }
            return callback(null,results.rows);
        });
    },
    get :(data, callback)=>{
        pool.query(
            `Select * from mobilicts.person where id = $1`
            ,
            [data.params.id]
            ,
            (err,results)=>{
                if(err){
                    return callback(err);
                }
                return callback(null,results.rows);

            }
        );

    },
    update : (data, callback)=>{

        pool.query(`update mobilicts.person set first_name = $1 , last_name = $2,  email= $3 ,password=$4 ,mobile=$5 where id = $6`
        ,
        [
            data.first_name,
            data.last_name,
            data.email,
            data.password,
            data.mobile,
            data.id
        ]
        ,
        (err, results)=>{
            if(err){
                return callback(err);
            }
            return callback(null,results);

        });
    },
    deleteuser : (data, callback)=>{

        pool.query(`delete from  mobilicts.person where id= $1`
        ,
        [
            data.id
        ]
        ,
        (err,results)=>{
            if(err){
                return callback(err);

            }
            return callback(null,results);

        });

    },
    login : (data, callback)=>{

        pool.query(`select * from mobilicts.person where email = $1 `
        ,
        [
            data.email
        ]
        ,
        (err, results)=>{
            if(err){
                return callback(err);
            }
            console.log(results.rows[0]);
            return callback(null,results.rows[0]);
        });

    }
}