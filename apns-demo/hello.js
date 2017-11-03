console.info('hello world');
var argv=process.argv.splice(2);

if (argv.length>0){
var args=argv[0];
console.info(args);
var b=new Buffer(args, 'base64');
var s=b.toString();
console.info(s);
var a=JSON.parse(s);
console.info(a);
}




process.exit();
