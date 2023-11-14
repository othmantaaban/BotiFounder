rm -rf ./ios
ionic build
ionic cap add ios
# sed -i '' "s/\(.*\)\"}\"/\1\"func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {\n  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)\n}\n\nfunc application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {\n  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)\n}\"/" "./ios/App/App/AppDelegate.swift"
sed -i '' '48,$ d' "./ios/App/App/AppDelegate.swift"

sed -i '' "s/\(.*\)# Add your Pods here/\1# Add your Pods here\n\tpod 'Firebase\/Messaging'/" "./ios/App/Podfile"
sed -i -e '$a\'$'\n''placeholderfunctions' "./ios/App/App/AppDelegate.swift"

sed -i '' "s/\(.*\)import Capacitor/\1import Capacitor\nimport Firebase/" "./ios/App/App/AppDelegate.swift"
sed -i '' "s/\(.*\)return true/\1FirebaseApp.configure() \n return true/" "./ios/App/App/AppDelegate.swift"
sed -i '' "s/\(.*\)placeholderfunctions/\1func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {\n  Messaging.messaging().apnsToken = deviceToken\n  Messaging.messaging().token(completion: { (token, error) in\n    if let error = error {\n        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)\n    } else if let token = token {\n        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)\n    }\n  })\n}\n\nfunc application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {\n  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)\n}\n}/" "./ios/App/App/AppDelegate.swift"

ionic cap update ios

npx capacitor-assets generate --ios
# cp ./GoogleService-Info.plist ./ios/App/App
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v UIFileSharingEnabled ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n "true" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v LSSupportsOpeningDocumentsInPlace ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n "true" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v UIRequiresFullScreen ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n "true" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSPhotoLibraryUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the photo library to send images in pages such as message and profile." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSMicrophoneUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the microphone to send an audio recording in pages such as message." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSCameraUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the camera to take pictures in pages such as message and profile." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSPhotoLibraryAddUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the photo library to send images in pages such as message and profile." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v "NSAppTransportSecurity" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n dict ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict/dict" -t elem -n key -v "NSAllowsArbitraryLoads" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict/dict" -t elem -n "true" ./ios/App/App/Info.plist

sed -i '' "s/source=\"\$(readlink \"\${source}\")\"/source=\"\$(readlink -f \"\${source}\")\"/g" "./ios/App/Pods/Target Support Files/Pods-App/Pods-App-frameworks.sh"

ionic cap open ios