var http = require('http');
var sql = require('mssql/msnodesqlv8');
var url = require('url');

function getProducts(res){
		res.writeHead(200,{"Content-Type" : "application/json; charset=utf-8"});
   
    var pool = new sql.ConnectionPool({
      database: "InternetShopDB",
      server: "localhost",
      driver: "msnodesqlv8",
      options: {
        trustedConnection: true
      }
    });
	
    pool.connect().then(() => {
	    pool.request().query('select * from Goods', (err, result) => {
			res.write(JSON.stringify(result.recordsets[0]));	
			res.end();			
        });
    });
}

  http.createServer(function (req, res) {
	 
	if(url.parse(req.url, true).pathname == '/api/products'){
		getProducts(res);
	}
	
  }).listen(8888);
  