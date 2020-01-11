const neighCnt =(r,c,a) =>{
  var sum=0, ac= a.length, ar =a[0].length;
  // console.log("---->"+ac+"*"+ar);
  if(a.length==0||a[0].length==0) return;
 sum = [{k:r+1,v:c}, {k:r-1,v:c}, {k:r,v:c+1}, {k:r,v:c-1}, {k:r+1,v:c+1}, {k:r-1,v:c+1}, {k:r+1,v:c-1}, {k:r-1,v:c-1}]
      .filter(item => ( item.k>-1 && item.v>-1 && item.k<ac  && item.v<ar ))
     . reduce((acc, item)=>{  //console.log(item.k+' : '+item.v);
                              acc=acc+a[item.k][item.v];
                              return acc
                            },0)
	return sum;
}

var arr = [ [0,1,1,0],
            [0,1,0,1],
            [1,0,1,0],
            [0,1,1,0]];
var nArr = []
// console.log('output->'+neighCnt(0,0,arr));

for(let row=0; row <arr.length; row++){
  var sArr=[];
  for(let col=0; col <arr[row].length; col++){
     sArr.push(neighCnt(row,col,arr)==2?1:0)
  }
  nArr.push(sArr)
}

// console.log(nArr);

var inputStr = "a:bb:cc:abcdef:ab:c:d:"
var inputArr = inputStr.split(":");
inputArr = inputArr.map(item=>item==''? item : item+":")
// console.log(inputArr);
var len =inputArr[0].length;
var chunk = [];
var temp=inputArr[0];
var Max_Len = 5;
for(let i=1; i< inputArr.length; i++){
  // console.log(inputArr[i]);
   if(len+inputArr[i].length <= Max_Len){
     len+=inputArr[i].length;
     temp+=inputArr[i]
     // console.log(temp);
   }else{
     // console.log(temp);
     chunk.push(temp);
     temp=inputArr[i];
     // console.log(temp);
     len=inputArr[i].length;
   }

}
if(temp.length>0)
  chunk.push(temp);
// console.log("out2->",chunk);




var inputSt = "ABBBCCD"

var lastChar= inputSt[0]
let tm=1;
let outStr='';
for(let i=1; i<inputSt.length;i++){
  if(inputSt[i]==lastChar){
    tm++;
  }else{
    outStr+=tm+lastChar;
    lastChar=inputSt[i];
    tm=1;
  }
}
if(lastChar!='')
outStr+=tm+lastChar;

// console.log(inputSt);
// console.log(outStr);

var inputSt = "10A2B3C1D"
var cnt=0;
var outputSt='', lastChar='';
for(let i=0;i<inputSt.length;i++){
  if(!isNaN(inputSt[i])){
      cnt+=inputSt[i];
  }else{
    lastChar = inputSt[i]
    var ctInt = parseInt(cnt);
   for(let j=0;j<ctInt;j++)
    outputSt+=lastChar
    cnt=0;
  }
}
// console.log(outputSt);

var ip1="123", ip2="97";
var sum=0, carry=0, num1=0, num2=0, rightDig=0;

for(let i=0; i< ip1.length || i< ip2.length;i++){
   if(i< ip1.length && i< ip2.length){
     num1= parseInt(ip1[ip1.length-1-i]);
     num2= parseInt(ip2[ip2.length-1-i]);
     rightDig = num1+num2
   }else if(i< ip1.length){
     num1= parseInt(ip1[ip1.length-1-i]);
     rightDig = num1
   }else{
     num2= parseInt(ip2[ip2.length-1-i]);
     rightDig = num2;
   }
   sum+=Math.pow(10,i)*(rightDig%10+carry);
   console.log(rightDig+" "+sum);
   carry =Math.floor(rightDig/10);

}
// console.log("out"+sum);

// var suArr= [
// 			 [4,2,9,8,1,3,5,6,7],
// 			 [5,1,6,4,7,2,9,3,8],
// 			 [7,8,3,6,5,9,2,4,1],
// 			 [6,7,2,1,3,4,8,5,9],
// 			 [3,9,5,2,8,6,1,7,4],
// 			 [8,4,1,7,9,5,6,2,3],
// 			 [1,5,8,3,6,7,4,9,2],
// 			 [9,3,4,5,2,8,7,1,6],
// 			 [2,6,7,9,4,1,3,8,5]
//      ];
     var suArr	= [
             [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
             [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
             [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
             [ 2, 3, 4, 5, 6, 7, 8, 9, 1 ],
             [ 5, 6, 7, 8, 9, 1, 2, 3, 4 ],
             [ 8, 9, 1, 2, 3, 4, 5, 6, 7 ],
             [ 3, 4, 5, 6, 7, 8, 9, 1, 2 ],
             [ 6, 7, 8, 9, 1, 2, 3, 4, 5 ],
             [ 9, 1, 2, 3, 4, 5, 6, 7, 8 ]
           ];

const blockCheck = (r,c)=>{
  var block ={}
  for(let i=r; i <r+3; i++){
    for(let j=c; j <c+3; j++){
      if(block[suArr[i][j]]){
        console.log(i+':'+j);
          return false
      }
      else
        block[suArr[i][j]] = true;
    }
  }
  return true;
}

const checkSu = ()=>{
  for(let i=0; i<suArr.length;i++){
    var rowObj ={}, colObj={};
    for(let j=0; j<suArr.length;j++){
        if(suArr[i][j]<1 || suArr[j][i]<1 || suArr[i][j]>9 || suArr[j][i]>9){
          console.log('checkSu1'+i+':'+j);
          return false;
        }
         if(rowObj[suArr[i][j]] || colObj[suArr[j][i]]){
           console.log('checkSu2 '+i+':'+j+'-'+rowObj[suArr[i]]+' : '+colObj[suArr[j]]);
             return false
         }else{
           rowObj[suArr[i][j]]=true;
           colObj[suArr[j][i]]=true;
         }
        if(i%3==0 && j%3==0){
          if(!blockCheck(i,j)){
            console.log('blockCheck'+i+':'+j);
            return false;
          }
        }

    }
  }
  return true;
}
// console.log(' check Sudoko ->'+checkSu());


var a1 = [1,3,5,7]
var a2 = [2,4,6,8,10]
const mergeArr = ()=>{
  var mArr=[];
  var i=0,j=0;
  while(i<a1.length|| j<a2.length){
    if(i<a1.length && j<a2.length){
      if(a1[i]<=a2[j]){
        console.log("1=>"+a1[i]+'-'+a2[j]);
        mArr.push(a1[i])
        i++;
      }else{
        mArr.push(a2[j])
        j++;
      }
    }else if(i<a1.length){
      while(i<a1.length){
        mArr.push(a1[i])
        i++
      }
    }else{
      while(j<a2.length){
        mArr.push(a2[j])
        j++
      }

    }
  }
  return mArr;
}

// console.log(mergeArr());

var input = "The Fox Jumps over the fence"
var outF = input.split(" ").reverse().map(item =>{
  var out='';
  for(let c of item){
    out=c+out;
  }
  return out
}).reduce((acc, word)=>{
  return acc+" "+word    
},"")
console.log(outF);
