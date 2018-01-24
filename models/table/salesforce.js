const jsforce = require('jsforce');
const async = require('async');

exports.sfConn = (user) => {
    return new Promise(resolve => {
        const conn = new jsforce.Connection({ instanceUrl: user.sf_instance, accessToken : user.sf_token });
        resolve(conn)
    })
}

exports.find_sf_tasks = (user, conn) => {
    // const conn = new jsforce.Connection({ instanceUrl: user.sf_instance, accessToken : user.sf_token });
    return new Promise(resolve => {
    let Now = new Date();
    Now = Now.toISOString().slice(0, 10);
    conn.query(`SELECT Id, ActivityDate, subject, description, whoId FROM Task WHERE ActivityDate > ${Now}`, function(err, result){
        let taskArray = result.records;
        let updatedArray = [];

        async.map(taskArray, (task, next) => {
            console.log("wdaw");
            task.enddate = task.ActivityDate;
            task.title = task.Subject;
            task.Description ? task.content = task.Description : task.content = '';
            task.id = task.Id;
            updatedArray.push(task);
            next();
        }, function(err){
            resolve(updatedArray);
        })
        // async.each(taskArrayRel, (task, next) => {
        //     if (task.WhoId.startsWith('00Q')) {
        //         conn.query(`SELECT id, FirstName, LastName FROM Lead WHERE id = '${task.WhoId}'`, function(err, result){
        //             task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
        //             task.enddate = task.ActivityDate;
        //             task.title = task.Subject;
        //             task.Description ? task.content = task.Description : task.content = '';
        //             task.id = task.Id;
        //             updatedArray.push(task);
        //             next();
        //         })
        //     } else if (task.WhoId.startsWith('003')) {
        //         conn.query(`SELECT id, FirstName, LastName FROM Contact WHERE id = '${task.WhoId}'`, function(err, result){
        //             task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
        //             task.enddate = task.ActivityDate;
        //             task.title = task.Subject;
        //             task.Description ? task.content = task.Description : task.content = '';
        //             task.id = task.Id;
        //             updatedArray.push(task);
        //             next();
        //         })
        //     }
          
        // }, function(err) {
        //     if (err) {
        //         console.log(err);
        //         return []}
        //     else {
        //         console.log("SUCCESS");
        //         resolve(updatedArray)}
        // })
    })
    })
}
