var arr =[];

for(const i of [1,2,3])
  arr.push((()=>i)());

console.log(arr);
