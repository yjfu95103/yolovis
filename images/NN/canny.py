import cv2
import numpy as np
import sys, os

# image = cv2.imread("./images/coins.png")
filename = sys.argv[1]
image = cv2.imread(filename)

image = cv2.resize(image, (400, 400), interpolation=cv2.INTER_AREA)
cv2.imwrite("_.png", image) 

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

blurred = cv2.GaussianBlur(gray, (5, 5), 0)

canny = cv2.Canny(blurred, 30, 150)
# canny.save( "cat_canny.PNG" )

# result = np.hstack([gray, blurred, canny])

outputname = filename.split('.',1)[0]+'_canny.'+filename.split('.',1)[1]
print("save to",outputname)

cv2.imwrite(outputname, canny) 
# cv2.imshow("Result:", result)
cv2.waitKey(0)
