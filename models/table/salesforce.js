const jsforce = require('jsforce');
const async = require('async');


exports.sfConn = (user) => {
    return new Promise(resolve => {
        const conn = new jsforce.Connection({ instanceUrl: user.sf_instance, accessToken : user.sf_token });
        resolve(conn)
    })
}

exports.find_sf_tasks = (user, conn) => {
    return new Promise(resolve => {
    let Now = new Date();
    Now = Now.toISOString().slice(0, 10);
    conn.query(`SELECT Id, ActivityDate, subject, description, whoId, CreatedDate FROM Task WHERE ActivityDate > ${Now} AND OwnerId = '${user.sf_userId}' AND Status != 'Completed'`, 
    function(err, result){
        let taskArray = result.records;
        let updatedArray = [];

        async.each(taskArray, (task, next) => {
            !task.WhoId ? task.WhoId = '' : task.WhoId;
            if (task.WhoId.startsWith('00Q')) {
                conn.query(`SELECT id, FirstName, LastName FROM Lead WHERE id = '${task.WhoId}'`, function(err, result){
                    task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
                    task.enddate = task.ActivityDate;
                    task.title = task.Subject;
                    task.Description ? task.content = task.Description : task.content = '';
                    task.id = task.Id;
                    task.is_sf_task = true;
                    task.createdAt = task.CreatedDate;
                    updatedArray.push(task);
                    next();
                })
            } else if (task.WhoId.startsWith('003')) {
                conn.query(`SELECT id, FirstName, LastName FROM Contact WHERE id = '${task.WhoId}'`, function(err, result){
                    task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
                    task.enddate = task.ActivityDate;
                    task.title = task.Subject;
                    task.Description ? task.content = task.Description : task.content = '';
                    task.id = task.Id;
                    task.is_sf_task = true;
                    task.createdAt = task.CreatedDate;
                    updatedArray.push(task);
                    next();
                })
            } else {
                task.enddate = task.ActivityDate;
                task.title = task.Subject;
                task.Description ? task.content = task.Description : task.content = '';
                task.id = task.Id;
                task.is_sf_task = true;
                task.createdAt= task.CreatedDate;
                updatedArray.push(task);
                next();
            }
        }, function(err) {
            if (err) {console.log(err)}
            else {resolve(updatedArray)}
        })
    })
    })
}

//Update Salesforce task to completed or deferred
exports.update_sf_task = (conn, userId, taskId, data) => {
    data.status === "true" ? status = "Completed" : status = "Deferred";
    conn.sobject("Task").update({ 
        Id : taskId,
        Status: status
    }, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
    });
}

exports.find_sfTask_by_Id = (conn, taskId) => {
    return new Promise(resolve => {
    conn.query(`SELECT Id, ActivityDate, subject, description, whoId, CreatedDate FROM Task WHERE Id = '${taskId}'`, (err, result) => {
        task = result.records[0];
        !task.WhoId ? task.WhoId = '' : task.WhoId;
            if (task.WhoId.startsWith('00Q')) {
                conn.query(`SELECT id, FirstName, LastName FROM Lead WHERE id = '${task.WhoId}'`, function(err, result){
                    task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
                    task.enddate = task.ActivityDate;
                    task.title = task.Subject;
                    task.Description ? task.content = task.Description : task.content = '';
                    task.id = task.Id;
                    task.is_sf_task = true;
                    task.createdAt = task.CreatedDate;
                    resolve(task);
                })
            } else if (task.WhoId.startsWith('003')) {
                conn.query(`SELECT id, FirstName, LastName FROM Contact WHERE id = '${task.WhoId}'`, function(err, result){
                    task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
                    task.enddate = task.ActivityDate;
                    task.title = task.Subject;
                    task.Description ? task.content = task.Description : task.content = '';
                    task.id = task.Id;
                    task.is_sf_task = true;
                    task.createdAt = task.CreatedDate;
                    resolve(task);
                })
            } else {
                task.enddate = task.ActivityDate;
                task.title = task.Subject;
                task.Description ? task.content = task.Description : task.content = '';
                task.id = task.Id;
                task.is_sf_task = true;
                task.createdAt= task.CreatedDate;
                resolve(task);
            }
    })
})

}