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
      // console.log(headers);
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

     // var sheet1={
     //         header: headerJSON,
     //         items: itemsJson,
     //         sheetName: 'stockList'  //
     //     };
     //
     //     var data = {
     //         sheets: [sheet1],
     //         // filepath: '_List'+'20191012'+'.xlsx'
     //         filepath: '_List'+dateTStr()+'.xlsx'
     //     }
     //
     //     jexcel.j2e(data,function(err){
     //         console.log('finish')
     //     });



       // You can define styles as json object
       const styles = {
         headerDark: {
           fill: {
             fgColor: {
               rgb: 'FF000000'
             }
           },
           font: {
             color: {
               rgb: 'FFFFFFFF'
             },
             sz: 14,
             bold: true,
             underline: true
           }
         },
         cellPink: {
             font: {alignment: {
               horizontal: true
             }},
            fill: {
             fgColor: {
               rgb: 'FFFFCCFF'
             }
           }
         },
         cellRed: {
           font: {alignment: {
             horizontal: true
           }},
           fill: {
             fgColor: {
               rgb: 'FFA07A'
             }
           }
         },
         cellYellow: {
           font: {alignment: {
             horizontal: true
           }},
           fill: {
             fgColor: {
               rgb: 'FFFACD'
             }
           }
         },
         cellNoColor: {
           font: {alignment: {
             horizontal: true
           }},
           fill: {
             fgColor: {
               rgb: 'FFFFFF'
             }
           }
         },
         cellGreen: {
           font: {alignment: {
             horizontal: true
           }},
           fill: {
             fgColor: {
               rgb: 'FF00FF00'
             }
           }
         }
       };
       var specification ={};
        // specification['Composite Rating']: { cellStyle: (value, row) => ((value > 94) ? styles.cellGreen : styles.cellNoColor)}
        // specification['EPS Rating']:  { cellStyle: (value, row) => ((value > 90) ? styles.cellGreen : styles.cellNoColor)}
        // specification['RS Rating']:  { cellStyle: (value, row) => ((value > 90) ? styles.cellGreen : styles.cellNoColor)}
        // specification['SMR Rating']:  { cellStyle: (value, row) => ((value = 'A') ? styles.cellGreen : styles.cellNoColor)}
        // specification['ACC/DIS Rating']:   { cellStyle: (value, row) => ((value = 'A'|| value = 'A-' || value = 'A+') ? styles.cellGreen : styles.cellNoColor)}
        // specification['Group Rel Str Rating']:   { cellStyle: (value, row) => ((value = 'A'|| value = 'A-' || value = 'A+') ? styles.cellGreen : styles.cellNoColor)}
        // specification['EPS % Change(Latest Qtr)']:   { cellStyle: (value, row) => ((value > 25) ? styles.cellGreen : styles.cellNoColor)}
        // specification['EPS % Change(Prev Qtr)']:   { cellStyle: (value, row) => ((value >25) ? styles.cellGreen : styles.cellNoColor)}
        // specification['EPS EST % Change(Current Qtr)']:   { cellStyle: (value, row) => ((value > 15) ? styles.cellGreen : styles.cellNoColor)}
        // specification['EPS EST % Change(Current Yr)']:   { cellStyle: (value, row) => ((value >15) ? styles.cellGreen : styles.cellNoColor)}
        // specification['Sales % Change(Last Qtr)']:   { cellStyle: (value, row) => ((value >15) ? styles.cellGreen : styles.cellNoColor)}
        var noColHeadr = {cellStyle: styles.cellNoColor, headerStyle: styles.headerDark, cellFormat: (value, row) => ((value == undefined) ? "":value), width: 40}
        var headrObj = {headerStyle: styles.headerDark, cellFormat: (value, row) => ((value == undefined) ? "":value), width: 40}
        specification['Symbol'] = {displayName: 'Symbol', ...noColHeadr};
        specification['List'] = {displayName: 'List', ...noColHeadr};
        specification['Sector Rank'] = {displayName: 'SR', ...noColHeadr};
        // specification['Rank'] = {displayName: 'Rank', ...noColHeadr};
        specification['Price'] = {displayName: 'Price', ...noColHeadr};
        specification['Price Change'] = {displayName: 'Price Change', ...noColHeadr};
        specification['Price % Change'] = {displayName: 'Price %', ...noColHeadr};
        specification['% off High'] = {displayName: '% off High', ...noColHeadr};
        specification['Volume'] = {displayName: 'Volume', ...noColHeadr};
        specification['Volume % Change'] = {displayName: 'Volume %', ...noColHeadr};
        specification['Composite Rating']= {displayName: 'CR', cellStyle: (value, row) => ((value > 94) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['EPS Rating'] =  {displayName: 'EPS', cellStyle: (value, row) => ((value > 90) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['RS Rating'] =  {displayName: 'RS', cellStyle: (value, row) => ((value > 90) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['SMR Rating'] =  {displayName: 'SMR', cellStyle: (value, row) => ((value == 'A') ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['ACC/DIS Rating'] =   {displayName: 'AccDis', cellStyle: (value, row) => ((value == 'A'|| value == 'A-' || value == 'A+') ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['Group Rel Str Rating'] =   {displayName: 'GRS', cellStyle: (value, row) => ((value == 'A'|| value == 'A-' || value == 'A+') ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['EPS % Change(Latest Qtr)'] =   {displayName: 'EPSLQ', cellStyle: (value, row) => ((value > 25) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['EPS % Change(Prev Qtr)'] =   {displayName: 'EPSPQ', cellStyle: (value, row) => ((value >25) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['EPS EST % Change(Current Qtr)'] =   {displayName: 'EPSCQ', cellStyle: (value, row) => ((value > 20) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['EPS EST % Change(Current Yr)'] =   {displayName: 'EPSCY', cellStyle: (value, row) => ((value >20) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['Sales % Change(Last Qtr)'] =   {displayName: 'Sales', cellStyle: (value, row) => ((value >20) ? styles.cellGreen : styles.cellNoColor), ...headrObj}
        specification['Annual ROE'] = {displayName: 'Annual ROE', ...noColHeadr};
        specification['Annual Profit Margin (Latest Yr)'] = {displayName: 'PM', ...noColHeadr};
        specification['Mgmt Own %'] = {displayName: 'Mgmt Own %', ...noColHeadr};
        specification['Qtrs of Rising Sponsorship'] = {displayName: 'R Sponsor', ...noColHeadr};
        specification['Industry Group Rank'] = {displayName: 'Ind Grp', ...noColHeadr};
        specification['# of Funds'] = {displayName: '#Funds', ...noColHeadr};

        const excel = require('node-excel-export');
const headingArry = [
  [...headers] // <-- It can be only values
];

// const headingArry = [
//   ['List', 'Rank', 'Price' ] // <-- It can be only values
// ];
//
// const dataset = [
//   {List: 'IBM', Rank: 1, Price: 'some note', misc: 'not shown'},
//   {List: 'HP', Rank: 0, Price: 'some note'},
//   {List: 'MS', Rank: 0, Price: 'some note', misc: 'not shown'}
// ]

console.log(headingArry);
console.log(itemsJson[0]);

       const report = excel.buildExport(
         [
           {
             name: 'List', // <- Specify sheet name (optional)
             heading: headingArry, //[].push(headers), // <- Raw heading array (optional)
            // merges: merges, // <- Merge cell ranges
             specification: specification, // <- Report specification
             data: itemsJson // <-- Report data
           }
         ]
       );



       var fs = require('fs');

       try {
         fs.writeFileSync('_List'+dateTStr()+'.xlsx', report);
       } catch(err) {
         // An error occurred
         console.error(err);
       }
