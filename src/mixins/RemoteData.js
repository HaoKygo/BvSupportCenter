
export default function (resources) {
  return {  
    data() {
      let initData = {
        remoteDataLoading: 0
      };

      // Initial data properties.
      initData.remoteErrors = {};
      for (const key in resources) {
        initData[key] = null;
        initData.remoteErrors[key] = null;
      }

      return initData;
    },

    computed: {
      // Record the loading resource state
      remoteDataBusy () {
        return this.$data.remoteDataLoading !== 0;
      },
      // Record if has data loading errors.
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
          // Put errors to the remoteErrors Obj.
          this.$data.remoteErrors[key] = e;
        }
        this.$data.remoteDataLoading--;
      }
    },

    created() {
      for (const key in resources) {
       let url = resources[key];
       this.fetchResource(key, url);
      }
    }
  }
}
