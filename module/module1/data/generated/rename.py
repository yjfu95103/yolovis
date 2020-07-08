import os

#先取得該檔案夾內所有的檔案名稱
def get_list():
    all_name = os.listdir()
    return all_name
  
n = 0
# 
#對所有的檔案名稱做 for 迴圈，訂定你的命名規則
for i in get_list():
    # path = 'input_l0_f'+i + '.jpg'
    
    #如果你的檔案夾裡面不只有照片，也有其他類型的檔案，用 if 把照片挑出來
    if '.jpg' in i:  
        if 'input_l62' in i:
            change = 'input_l62'
            newname = 'input_l65'+i.split(change)[1]
            print(newname)     
            
            os. rename(i , newname)
            n=n+1


#layer_vis_l0_f18   input_l4_f63