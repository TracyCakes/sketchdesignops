import Settings from 'sketch/settings';
import { UIDialog } from './uidialog';
import { SettingKeys } from './constants';


export default function (context) {

  
  // Read settings
  let enableS3 = Settings.settingForKey(SettingKeys.ENABLE_S3) == 1
  let enablePreview = Settings.settingForKey(SettingKeys.ENABLE_PREVIEW) == 1
  let enableFonts = Settings.settingForKey(SettingKeys.ENABLE_FONTS) == 1
  let s3Bucket = Settings.settingForKey(SettingKeys.S3_BUCKET)
  let s3SecretKey = Settings.settingForKey(SettingKeys.S3_SECRET_KEY)
  let s3AccessKey = Settings.settingForKey(SettingKeys.S3_ACCESS_KEY)
  let queueDesign = Settings.settingForKey(SettingKeys.DESIGN_QUEUE)
  if (undefined == queueDesign) queueDesign = ""
  if (undefined == s3AccessKey) s3AccessKey = "<your access key here>"
  if (undefined == s3Bucket) s3Bucket = "<your bucket name>"
  if (undefined == s3SecretKey) s3SecretKey = "<your secret key>"
  UIDialog.setUp(context);
  // Build dialog
  const dialog = new UIDialog("GeneXus Plugin Configuration", NSMakeRect(0, 0, 400, 270), "Save", "Export & Sharing options")
  var onCheck = function onCheck() {

    var editable = textS3Bucket.isEditable();

    textS3Bucket.setEnabled(!editable);
    textS3Bucket.setEditable(!editable);

    textS3AccessKey.setEditable(!editable);
    textS3AccessKey.setEnabled(!editable);

    textS3SecretKey.setEditable(!editable);
    textS3SecretKey.setEnabled(!editable);

    txtQueueDesign.setEditable(editable);
    txtQueueDesign.setEnabled(editable);
  }
  UIDialog.setUp(context);
  dialog.addLeftLabel("", "Export Options");
  dialog.addDivider();
  dialog.addCheckbox("enablePreview", "Send Preview for Pages", enablePreview, () => { });
  dialog.addCheckbox("enableFonts", "Send Fonts", enableFonts, () => { });
  dialog.addLeftLabel("", "Sharing Options");
  dialog.addDivider();
  dialog.addCheckbox("enableS3", "Enable S3 Sharing", enableS3, onCheck);
  dialog.addLeftLabel("", "S3 Bucket");
  var textS3Bucket = dialog.addTextInput("s3Bucket", "", s3Bucket, "Enter bucket name");
  textS3Bucket.setEditable(enableS3);
  textS3Bucket.setEnabled(enableS3);
  dialog.addLeftLabel("", "S3 Access Key")
  var textS3AccessKey = dialog.addTextInput("s3AccessKey", "", s3AccessKey, "Enter access Key")
  textS3AccessKey.setEditable(enableS3)
  textS3AccessKey.setEnabled(enableS3)
  dialog.addLeftLabel("", "S3 Secret Key")
  var textS3SecretKey = dialog.addTextInput("s3SecretKey", "", s3SecretKey, "Enter secret Key")
  textS3SecretKey.setEditable(enableS3)
  textS3SecretKey.setEnabled(enableS3)
  dialog.addDivider()
  dialog.addLeftLabel("", "Queue Path")
  var txtQueueDesign = dialog.addTextInput("queueDesign", "", queueDesign, "Path to filesystem queue")
  txtQueueDesign.setEditable(!enableS3)
  txtQueueDesign.setEnabled(!enableS3)
  dialog.y -= 20

  // Run event loop
  while (true) {
    const result = dialog.run()
    if (!result) {
      dialog.finish()
      return false
    }
    var enableS3Num = dialog.views['enableS3'].state()
    var enablePreviewNum = dialog.views['enablePreview'].state()
    var enableFontsNum = dialog.views['enableFonts'].state()
    queueDesign = dialog.views['queueDesign'].stringValue() + ""
    s3SecretKey = dialog.views['s3SecretKey'].stringValue() + ""
    s3AccessKey = dialog.views['s3AccessKey'].stringValue() + ""
    s3Bucket = dialog.views['s3Bucket'].stringValue() + ""

    Settings.setSettingForKey("DesignOpsQueue", queueDesign);
    Settings.setSettingForKey("gxS3Enabled", enableS3Num);
    Settings.setSettingForKey("enablePreview", enablePreviewNum);
    Settings.setSettingForKey("enableFonts", enableFontsNum);
    if (!s3AccessKey.startsWith("<"))
      Settings.setSettingForKey("gxS3AccessKey", s3AccessKey);
    if (!s3SecretKey.startsWith("<"))
      Settings.setSettingForKey("gxS3SecretKey", s3SecretKey);
    if (!s3Bucket.startsWith("<"))
      Settings.setSettingForKey("gxBucket", s3Bucket);
    break
  }
  dialog.finish()

}


