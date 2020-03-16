
export default function (resources) {
  return {  
    data() {
      let initData = {
        remoteDataLoading: 0
      };

      // 初始化数据属性
      initData.remoteErrors = {};
      for (const key in resources) {
        initData[key] = null;
        initData.remoteErrors[key] = null;
      }

      return initData;
    },

    computed: {
      // 记录加载资源状态
      remoteDataBusy () {
        return this.$data.remoteDataLoading !== 0;
      },
      // 记录书否有加载错误
      hasRemoteErrors () {
        return Object.keys(this.$data.remoteErrors).some(
          key => this.$data.remoteErrors[key]
        );
      }
    },

    methods: {
      async fetchResource (key, url) {
        this.$data.remoteDataLoading++;
        try {
          this.$data[key] = await this.$fetch(url);
        }
        catch (e) {
          console.error(e);
          // 将错误存入错误对象
          this.$data.remoteErrors[key] = e;
        }
        this.$data.remoteDataLoading--;
      }
    },

    created() {
      for (const key in resources) {
        let url = resources[key];
        if (typeof url === 'function') {
          this.$watch(url, (val) => {
            this.fetchResource(key, val);
          }, {
            immediate: true
          });
        } else {
          this.fetchResource(key, url);
        }
      }
    }
  }
}
