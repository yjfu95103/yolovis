import cv2
import numpy as np

# image = cv2.imread("./images/coins.png")
image = cv2.imread("cat.PNG")

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

blurred = cv2.GaussianBlur(gray, (5, 5), 0)

canny = cv2.Canny(blurred, 30, 150)
# canny.save( "cat_canny.PNG" )
print(canny)

result = np.hstack([gray, blurred, canny])

cv2.imshow("Result:", result)
cv2.waitKey(0)

