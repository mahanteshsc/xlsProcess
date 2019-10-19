const XLSX = require('xlsx')
const fileNames = [
                  'IBD 50.xls',
                  'SECTOR LEADERS.xls',
                  'STOCK SPOTLIGHT.xls',
                  'IPO LEADERS.xls',
                  'BIG CAP 20.xls',
                  'YOUR WEEKLY REVIEW.xls',
                  'CANSLIM SELECT.xls',
                  'GLOBAL LEADERS.xls',
                  'RELATIVE STRENGTH AT NEW HIGH.xls',
                  'STOCKS THAT FUNDS ARE BUYING.xls',
                  'RISING PROFIT ESTIMATES.xls'
                ];

const listMapping = {
  'IBD 50': 'IBD50',
  'SECTOR LEADERS':'SL',
  'STOCK SPOTLIGHT':'SSL',
  'IPO LEADERS':'IPOL',
  'BIG CAP 20':'BC20',
  'YOUR WEEKLY REVIEW':'YWR',
  'CANSLIM SELECT':'CANSLIM',
  'GLOBAL LEADERS':'GL',
  'RELATIVE STRENGTH AT NEW HIGH':'RS',
  'STOCKS THAT FUNDS ARE BUYING':'Funds',
  'RISING PROFIT ESTIMATES':'RPM'
}
var dataJson = {};
var allDataJson = {};
var headers =[];
   fileNames.forEach(fileName => {
     var header =[];
     // var  fileName = fileNames[0]
     var workbook = XLSX.readFile("1/"+fileName);
     var sheet_name_list = workbook.SheetNames;
     console.log("***************************PROCESSING***********"+fileName+"**************"+sheet_name_list[0]);
     var isSymbolSet = false;
     var isEndOfFile = false;
     var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
     xlData.forEach( line => {
       // console.log(line);
       if(isEndOfFile){
         // console.log("************** isEndOfFile ");
         return;
       }
       // console.log("*************************** Line Start");
       if(isSymbolSet){
         // console.log("*************************** Line");
       }
       var col =0;
       Object.entries(line).forEach(([key, val]) => {
         col++;
         if(isSymbolSet){
           if((!val || val.trim() ==='') && (Object.keys(line).length==0 || Object.keys(line).length==1)){
             isEndOfFile =true;
             return;
           }
           if(isEndOfFile)
           return;
         }else if(val=='Symbol'){
            isSymbolSet=true;
        }

        if(isSymbolSet){

          if(Object.values(line)[0]=='Symbol'){
            // console.log(val);
            if(!headers.includes(val)){
              headers.push(val);
            }
            if(!header.includes(val)){
              header.push(val);
            }
          }else{
            // allData[headers[col-1]][Object.values(line)[0]] = val;
            var keyVal0 = String(header[col-1]);
            // var keyVal0 = String(Object.keys(line)[0]);
            var keyVal1 = String(Object.values(line)[0]);
            // console.log("***"+keyVal0+"**"+header[col]+" ***"+header[col-1]+"****"+val);
            // console.log("***"+keyVal0+"**"+header[col-1]+"****"+val);
            dataJson[keyVal0] = Object.assign({}, dataJson[keyVal0]);
            // dataJson[keyVal0][keyVal1]=val;
            var res = (isNaN(parseFloat(val))? val : parseFloat(val));
            if(keyVal0=='Symbol'){
              var listNames = dataJson[keyVal0][keyVal1];
              // dataJson[keyVal0][keyVal1] = listNames? [...listNames,fileName]: [fileName];
              var newObj = {}
              var tempFileName =   fileName.replace(".xls","")
              var fileNameList = listMapping[tempFileName];
              // console.log('->'+tempFileName+'-'+fileNameList);
              newObj[keyVal1] = listNames && !listNames.includes(fileNameList)? [...listNames,fileNameList]: [fileNameList];
              dataJson[keyVal0] = Object.assign({...dataJson[keyVal0]}, newObj);
            }else if(keyVal0!='undefined'){
              var newObj = {}
              newObj[keyVal1] = res;
              // dataJson[keyVal0][keyVal1] = res;

                // console.log('keyVal0 ->'+keyVal0+' col ->'+col);
                // dataJson[keyVal0] = Object.assign({...dataJson[keyVal0]}, newObj);
                if(!dataJson[keyVal0][keyVal1]){
                  dataJson[keyVal0] = Object.assign({...dataJson[keyVal0]}, newObj);
                }

            }else{
              // console.log("***"+keyVal0+"**"+keyVal1+"****"+val);
              // console.log(keyVal0+" "+keyVal1);
            }
            // console.log('keyVal0 ->'+keyVal0);

            // console.log(`${keyVal0} `);
            // console.log(`${keyVal0} - ${keyVal1} - ${res}`);
            // if(!headers[keyVal0] || headers[keyVal0].length==0){
            //   headers[keyVal0] = [];
            // }else{
            //   headers[keyVal0].push(dataJson);
            // }

            var objAll = {...allDataJson};
            allDataJson = Object.assign(objAll, dataJson);
            // console.log(dataJson);
          }
        }
      });
       // console.log(line);
     })
     // console.log(header);
      })
      // console.log(headers);

      headers[1]='List';
      console.log(headers);
    // console.log("*************************");
    var outputJson = JSON.parse(JSON.stringify(allDataJson));
     // console.log(outputJson);
     var headerJSON={}, itemsJson=[];
     var jexcel=require('json2excel');
     var symbols =  Object.keys(outputJson[headers[0]]);
// console.log(Object.keys(outputJson[headers[0]]));

     for(var j=0 ; j< symbols.length; j++){
       var ticker = symbols[j];
       // console.log(ticker);
       var rowItem={};
       for(var k=0; k<headers.length;k++){
            var keyValObj = {};
            keyValObj[headers[k]] = headers[k];
            // keyValObj[headers[k]] = outputJson[headers[k]][ticker];

           // dataJson[keyVal0] = Object.assign({...dataJson[keyVal0]}, newObj);
           headerJSON = Object.assign({...headerJSON}, keyValObj);
           var rowKeyValObj ={};
           var cellData = outputJson[headers[k]] && outputJson[headers[k]][ticker] ?outputJson[headers[k]][ticker]:"";
           // console.log(headers[k]+' - '+cellData);
           if(headers[k]=='Symbol'){
             rowKeyValObj[headers[k]] = ticker;
             rowKeyValObj['List'] = (cellData.join(", "));
             // console.log(rowKeyValObj);
           }else if(headers[k]=='List'){
           }else{
             rowKeyValObj[headers[k]] = cellData;
           }
           rowItem = Object.assign({...rowItem}, rowKeyValObj);
       }
       // console.log(rowItem);
       itemsJson.push(rowItem);
     }

     // for(var j=0 ; j< symbols.length; j++){
     //   for(var k=0; k<headers.length;k++){
     //     console.log(headers[k]+"-"+symbols[j]+"-"+(outputJson[headers[k]]?outputJson[headers[k]][symbols[j]]:""));
     //   }
     // }
     const dateTStr = () =>{
       let date_ob = new Date();
       let date = ("0" + date_ob.getDate()).slice(-2);
       let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
       let year = date_ob.getFullYear();
         // return (year + "" + month + "" + date )
       let hours = date_ob.getHours();
       let minutes = date_ob.getMinutes();
       let seconds = date_ob.getSeconds();
         return (year + "" + month + "" + date + "" + hours + "" + minutes + "" + seconds);
     }


     // console.log(itemsJson);

     var sheet1={
             header: headerJSON,
             items: itemsJson,
             sheetName: 'stockList'  //
         };

         var data = {
             sheets: [sheet1],
             // filepath: '_List'+'20191012'+'.xlsx'
             filepath: '_List'+dateTStr()+'.xlsx'
         }

         jexcel.j2e(data,function(err){
             console.log('finish')
         });
