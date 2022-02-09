# image-optimiser
##### simple image optimser service for websites and cms image delivery

```bash
npm run dev
```
to run on local server

```bash
npm run build
```
to build a production bundle



##### API usage
GET http://localhost:3010/optimize/<image_id>?filters


##### Check api usage with sample.jpg file 
http://localhost:3010/optimize/sample.jpg?negative=true


### Following filters is supported
1. **format** = jpg | png | webp 
    - output file format
    - e.g. format=jpg
2. **resize** = width,height
    - resize the image
    - width and height divided by comma or width in px
    - e.g resize=200,100 or resize=200
3. **crop** = left,top,width,height
    - crop the image
    - left,top,width and height divided by comma in px 
    - e.g. crop=50,50,200,100
4. **padding** = left,top,right,bottom,color
    - pads the edges of the image with the provided background colour.
    - left,top,width,bottom and color in rgba or hex
    - e.g. padding=2,2,2,2,186:6:144:80 or padding=2,2,2,2,@B80690
5. **trim** = threshold number
    - trim "boring" pixels from all edges that contain values similar to the top-left pixel. Images consisting entirely of a single colour will calculate "boring" using the alpha channel, if any.
    - e.g. trim=50
6. **rotate** = angle,backgroundcolor
    - rotate the image
    - AngleInNumber,BackgroundColor in rgba or hex
    - e.g. rotate=90,186:6:144:80 or rotate=90,@B80690
7. **flip** = h or v
    - flip the image vertically or horizontally
    - h for horizontal and v for vertical
    - e.g. flip=h or flip=v
8. **sharpen** = sigma<number>,flat<number>?,jagged<number>?
    - sharpen the image
    - sigma = the sigma of the Gaussian mask
    - flat = the level of sharpening to apply to "flat" areas.
    - jagged = the level of sharpening to apply to "jagged" areas.
    - e.g. sharpen=5,1.0,2.0
9. **median** = number
    - apply median filter
    - square mask size: size x size
    - e.g. median=3
10. **blur** = sigma<number>
    - blur the image
    - value between 0.3 and 1000 representing the sigma of the Gaussian mask
    - e.g. blur=10
11. **negative** = boolean
    - make negative copy
    - produce the "negative" of the image.
    - e.g. negative=true
12. **normalise** = boolen
    - enhance output image contrast by stretching its luminance to cover the full dynamic range.
    - enhance output image contrast by stretching its luminance to cover the full dynamic range.
    - e.g. normalise=true
13. **clahe** = width<number>,height<number>,maxSlope<number>
    - enhance the clarity of the image by bringing out darker details.
    - maxslope is a maximum value for the slope of the cumulative histogram, valid values are integers in the range 0-100
    - clahe=200,100,50
14. **threshold** = number
    - any pixel value greater than or equal to the threshold value will be set to 255, otherwise it will be set to 0.
    - can be used in grayscaling the image
    - e.g. threshold=100
15. **modulate** = brightness<number>,saturation<number>?,hue<degree>?
    - transforms the image using brightness, saturation, hue rotation
    - e.g = modulate=2,2,180
16. **brightness** = number
    - adjust brightness of the image
    - e.g. brightness=5
17. **hue** = deegree<number>
    - adjust hue of the image
    - eg. hue=180
19. **saturation** = number
    - adjust saturation of the image
    - e.g. saturation=2
20. **grayscale** = boolean
    - make grayscale copy the image
    - e.g. grayscale=true
21. **text** = left<number>,top<number>,font-size<number>,fill<color>,font-weight<number>,text<string>
    - add text on top of image
    - e.g. text=20,20,14,@B80690,500,Hello World
22. **overlay** = left<number>,top<number>,imageId<id of image>
    - to add image on top of image
    - e.g. overlay=50,50,overlay.png
