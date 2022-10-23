#!/bin/bash
if [ "$1" == "" ] 
then 
	echo "Usage: supply the version to update as a parameter, e.g \"update_version.sh 0.6.3\" ";
else
	echo "Updating version to $1 in all package.json files. "
	jq ".version=\"$1\"" package.json | sponge package.json
	jq ".version=\"$1\"" client/package.json | sponge client/package.json
	jq ".version=\"$1\"" server/package.json | sponge server/package.json
fi

