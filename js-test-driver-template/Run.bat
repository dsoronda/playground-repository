@echo off

SET MAIN_BROWSER_PATH="C:\Users\afronski\AppData\Local\Google\Chrome\Application\chrome.exe"
SET JSTESTDRIVER_APP=JsTestDriver-1.3.2.jar

java -jar "%JSTESTDRIVER_HOME%\%JSTESTDRIVER_APP%" --port 7777 --config "jsTestDriver.conf" --runnerMode INFO --captureConsole --browser="%MAIN_BROWSER_PATH%"