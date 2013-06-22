@echo off

SET JSTESTDRIVER_APP=JsTestDriver-1.3.2.jar

java -jar "%JSTESTDRIVER_HOME%\%JSTESTDRIVER_APP%" --tests all --captureConsole
PAUSE