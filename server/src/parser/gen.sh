#!/bin/bash
antlr4='java -jar /usr/local/lib/antlr-4.9.2-complete.jar'
grun='java -Xmx500M -cp "/usr/local/lib/antlr-4.9.2-complete.jar:$CLASSPATH" org.antlr.v4.gui.TestRig'
$antlr4 -Dlanguage=JavaScript T3Parser.g4 -o gen
#$antlr4 T3Parser.g4 -o gen