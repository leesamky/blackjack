
const express=require('express')
const app=express()
const fs=require('fs')

function standardDeviation(values){
    var avg = average(values);

    var squareDiffs = values.map(function(value){
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data){
    var sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}
const result={}
const avg=[]
const target=1000000000
app.post('/',function(req,res){
    if(avg.length<target/req.body.hand){
        avg.push(average(req.body.result))
        result[req.body.options]=avg
        fs.writeFileSync('result.txt',JSON.stringify(result,null,2))
        res.send('continue')
    }else{
        avg.push(average(req.body.result))
        result[req.body.options]=avg
        fs.writeFileSync('result.txt',JSON.stringify(result,null,2))
        console.log(average(avg).toString())
        res.send(average(avg).toString())
    }

})

module.exports=app