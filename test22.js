const HouseEdge=require('./Blackjack')
const GameOptions=require('./GameOptions')
const async=require('async')
const request=require('request')
const numTrials=1000
const handsPerTrial=10000

console.log(numTrials*handsPerTrial/10000)
var gameOptions=GameOptions({
    numberOfDecks:6,
    hitSoft17:false,
    doubleAfterSplit:true,
    doubleRange:[0,21],
    maxSplitHands:4,
    resplitAces:true,
    hitSplitedAce:false,
    surrender:'late',
    CSM:false,
    backBet:false,
    EuropeanNoHoldCard:false,
    rolling:0,
    // count: {system:'HiLo',trueCount:0},
    count:false,
    numberOfPlayer:1,
    backBetRatio:0,
    offerInsurance:false
})
console.log(gameOptions)




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

async.forever(
    function(next){
    let result=HouseEdge(numTrials,handsPerTrial,gameOptions)
    const options={
        url:'http://localhost:9000/blackjack',
        json:{
            options:JSON.stringify(gameOptions),
            result:result,
            hand:numTrials*handsPerTrial
        }
    }
    request.post(options,function(error,response,body){
        if(body==='continue'){
            next()
        }else{
            next(body)
        }

    })

},function(error){
    console.log(error)
})

// const options={
//     url:'http://localhost:9000/blackjack',
//     json:{
//         options:JSON.stringify(gameOptions),
//         result:HouseEdge(numTrials,handsPerTrial,gameOptions),
//         hand:numTrials*handsPerTrial
//     }
// }
//
// request.post(options,function(error,response,body){
//     console.log(body)
// })

