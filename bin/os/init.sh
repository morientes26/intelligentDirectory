cp intelligentDirectory.application.plist /Library/LaunchAgents

launchctl load /Library/LaunchAgents/intelligentDirectory.application.plist
launchctl start intelligentDirectory.application.plist


tail -f /var/log/system.log
