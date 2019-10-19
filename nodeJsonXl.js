var jexcel=require('json2excel');


var sheet1={
        header: {
            'author': 'Author Name',
            'title': 'Article Title'
        },
        items: [
         {
            author:'john',
            title:'how to use this'
         },
         {
            author:'Bob',
            title:'so Easy'
         }
        ],
        sheetName: 'sheet1'  //
    };



    var data = {
        sheets: [sheet1],
        filepath: 'j2x.xlsx'
    }

    jexcel.j2e(data,function(err){
        console.log('finish')
    });
