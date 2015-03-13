
/***********************************************************************

iPhone App Icon Export for iPhone 4/3 Touch and iPad.

Creates all 6 icons sizes that are required for these devices from homescreen, retina display, spotlight search       

1. To use this script, double click the script file, photoshop will launch and ask you for a 512x512 icon file of any image format (jpeg, psd, gif, png etc.)
2. Select the file and photos shop will create 6 icon files and save these with the correct names in the save folder as the 512 image.

3. Add these images into your iPhone project and update you app plist.
Read Apples Q&Q 1686 on how to add this icons to your info plist
http://developer.apple.com/iphone/library/qa/qa2010/qa1686.html

Hope you like this script, hit John Ballinger up on Twitter @sponno on from his website www.bluespark.co.nz

Please keep this Attribution here if you are going to redistrubte this code. Thanks
Creative Commons Attribution 3.0 New Zealand License
http://creativecommons.org/licenses/by/3.0/nz/     

************************************************************************/

//set unit preferences
var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;


/////////////////////////////////////////////////////////////////////////////////////////////

//create a new slideshow package
function doResizeAndOutput()
{                              
	
	   	// Select Icon file
		var file = File.openDialog("Select your Watch icon file, this should be 1024x1024 for best results, your new icon files will be saved here as well.", 
								   /\.(jpe|jpg|jpeg|gif|png|tif|tiff|bmp|psd)/i);
	    if (file == null) {
			// cancelled
			return;
		}
        app.open(file);  
		var path =  file.absoluteURI.substr(0,file.absoluteURI.lastIndexOf("/")+1);
	    path = path + "/" + "generated"
		var folder = new Folder(path);
		if (!folder.exists) {
			folder.create();
		}
		var resampleMethod = ResampleMethod.BICUBIC;
		
	    // Check document resolution
		if(activeDocument.resolution != 72){
			activeDocument.resizeImage(null, activeDocument.height, 72, ResampleMethod.BICUBIC);
		}
		
		var baseWidth = 1024;
		if (activeDocument.width != 1024) {
			baseWidth = 512;
		}
		
		// Png Save Options                                          
		var pngOptions = new PNGSaveOptions();
		pngOptions.interlaced = false;
		
		// Flatten document so layer fx don't scale.
		activeDocument.selection.selectAll();
		activeDocument.selection.copy(true);
		activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		
		var mergedDoc = app.documents.add(baseWidth, baseWidth, 72, "Merged Icon", NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1);
		
		activeDocument.selection.selectAll();
		activeDocument.paste();
		
		// iTunes artwork
		activeDocument.resizeImage(null, 1024, 1024, resampleMethod);
		activeDocument.saveAs(File(path + "/iTunesArtwork"), pngOptions, true, Extension.NONE);
		
		// Short Look - 42mm, 196x196
		activeDocument.resizeImage(null, 196, 196, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_short_look_icon_42mm_196x196.png"), pngOptions, true);
		
		// Short Look - 38mm, 172x172
		activeDocument.resizeImage(null, 172, 172, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_short_look_icon_38mm_172x172.png"), pngOptions, true);
		
		// Long Look - 42mm, 88x88
		activeDocument.resizeImage(null, 88, 88, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_home_screen_icon_42mm_88x88.png"), pngOptions, true);
		
		// Companion Settings @3x, 87x87
		activeDocument.resizeImage(null, 87, 87, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_settings_icon_29x29@3x.png"), pngOptions, true);
		
		// Home Screen (All), Long Look - 38mm, 80x80
		activeDocument.resizeImage(null, 80, 80, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_home_screen_icon_all_80x80.png"), pngOptions, true);
		
		// Companion Settings @2x, 58x58
		activeDocument.resizeImage(null, 58, 58, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_settings_icon_29x29@2x.png"), pngOptions, true);
		
		// Notification Center - 42mm, 55x55
		activeDocument.resizeImage(null, 55, 55, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_notification_icon_42mm_55x55.png"), pngOptions, true);
		
		// Notification Center - 38mm, 48x48
		activeDocument.resizeImage(null, 48, 48, resampleMethod);
		activeDocument.saveAs(File(path + "/watch_notification_icon_38mm_48x48.png"), pngOptions, true);
		
		
		 // Close file
		activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		
        alert("Done\nAll the new icons have been saved beside your original icons.")

}
//create the slideshow source files
doResizeAndOutput();
