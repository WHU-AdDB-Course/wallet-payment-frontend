let ajaxTimes = 0;
export const request = (params) =>{
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  const baseUrl = "http://localhost:9090";
  return new Promise((resolve,reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success:(result) =>{
        resolve(result.data);
      },
      fail:(err) =>{
        reject(err);
      },
      complete: () => {
        ajaxTimes --;
        if(ajaxTimes ===0){
          wx.hideLoading();
        }
      }
    })
  });
}