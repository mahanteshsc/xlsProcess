
var schData = [
  {startTime:100, endTime:400},
  {startTime:300, endTime:500},//100
  {startTime:500, endTime:700},//200
  {startTime:800, endTime:1000},//100
  {startTime:900, endTime:1100}
]



const fun1 = (qSt, qEnd) =>{
  // var ar =[];
 return schData
                .filter(item =>  item.endTime >= qSt ||item.startTime <= qEnd)
                .map(item => {
                  item.startTime = item.startTime<qSt?qSt:item.startTime;
                  item.endTime = item.endTime>qEnd?qEnd:item.endTime;
                  return item;
                })
                .reduce((acc, item)=>{
                  return acc+(item.endTime-item.startTime)
                },0);
}

console.log('fun1',fun1(400,900));


const fun = (qSt, qEnd) =>{
  var sum=0;
  var obj ={}

  var lastEndTime =qSt;
  for(let item of schData){
    if(item.endTime>qSt && item.startTime<qEnd){
      var iSt = item.startTime, iEnd = item.endTime;
      if(iSt<qSt){
          iSt = qSt
      }
      if(iEnd>qEnd){
          iEnd = qEnd
      }
      if(iSt < lastEndTime){
        iSt = lastEndTime;
      }
      if(lastEndTime<iEnd){
        lastEndTime = iEnd
      }
      var diff  = iEnd -iSt
      console.log(iSt +'--'+iEnd +'--'+ lastEndTime+'--'+ diff)
      sum = sum + (diff>0? diff :0);
    }

  }
  return sum;
}


// console.log(fun(400,900));
