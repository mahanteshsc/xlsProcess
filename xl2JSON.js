var xlsx2json = require('xlsx2json');
var fileNames = [
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

                // fileNames.forEach(fileName => {
                // });
                var  fileName = fileNames[0]
                var fileWithPath = "1/"+fileName;
                // xlsx2json("1/"+fileName).then(jsonArray => {
                //     console.log(jsonArray[0]);
                // });

                console.log("result");
                var xlsx2json = require('node-xlsx2json');
                xlsx2json(fileWithPath, function(error, result) {
                  // if (error) return console.error(error);
                  console.log(result);
                });
