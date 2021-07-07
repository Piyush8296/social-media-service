const defs = [
  { name: "db_port", type: Number}, // if needs to be changed on runtime
  { name: "server_port", type: Number}
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(defs)
const all_keys = Object.keys(options)

console.log(options)

for(let i=0;i<defs.length;i++){
	if(all_keys.indexOf(defs[i].name) < 0){
		console.log(`Argument Missing: ${defs[i].name}`)
		process.exit()
	}
}

module.exports = {
	"BASE_API_PATH":"/service/v1/social/int",
	"DB_URL":`mongodb://127.0.0.1:${options["db_port"]}/test-db`, // for now not adding any authentication
	"SERVER_PORT": options["server_port"] || 4000,

	"JWT_SECRET": "PY7t$74!0O9yu4Ff7QaZ1I1lLopQ@4eUyM1",
	"EXP_TIME_USER_TOKEN":"7d",
}