<template>
  <div class=" flex flex-col " style="height: calc(100vh - 144px);">
    <div class="i-layout-page-header header-title">
      <span class="ivu-page-header-title mr20">{{ $route.meta.title }}</span>
      <div>
        <div style="float: right">
          <el-button class="bnt" type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
    <div class="box-wrapper flex-1 flex flex-wrap " style="height: calc(100% - 40px)">
      <div class="left-wrapper">
        <div class="tree-vis">
          <div
            class="tab-item"
            :class="{ active: index == pageIndex }"
            v-for="(item, index) in info"
            :key="index"
            @click="edits(item, index)"
          >
            {{ item.name }} - {{ item.title }}
          </div>
        </div>
      </div>
      <div
        class="w-374 h-600 rounded-8 border-2 border-solid border-[#aaa] ml-20 overflow-y-scroll overflow-x-hidden container-scroll-y"
      >
        <!-- 顶部banner -->
        <div class="w-full h-350 relative">
          <swiper :options="swiperOption" class="w-full h-350">
            <swiper-slide class="w-full h-full" v-for="(item, index) in info[0].list" :key="index">
              <el-image class="w-full h-full" :src="item.img" fit="cover" />
            </swiper-slide>
          </swiper>
          <div
            class="absolute bottom-main left-main right-main py-6 rounded-main bg-000-4 flex items-center justify-around shadow-md z-10"
            v-show="info[1].list.length"
          >
            <div
              v-for="(item, index) in info[1].list"
              :key="index"
              class="relative w-74 h-50 overflow-hidden rounded-main"
            >
              <el-image class="w-full h-full" :src="item.img" fit="cover" />
              <div
                class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-fff bg-000-1 z-[12]"
              >
                <!-- <i class="iconfont text-fff text-40" v-html="e.icon" /> -->
                <div class="text-12">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 案例 -->
        <div class="mt-20 mx-main">
          <Title className="mb-10" :title="info[2].title" :subTitleBottom="info[2].subTitle" :isMore="true" />
          <div class="container-scroll h-150 w-full">
            <div
              class="inline-block w-124 h-full mr-main last:mr-0 shadow-md"
              v-for="(item, index) in info[2].list"
              :key="index"
            >
              <div class="h-full overflow-hidden rounded-main relative bg-main">
                <el-image class="w-full h-full" :src="item.img" fit="cover" />
                <div
                  class="absolute top-20 left-0 bg-fff-8 text-main font-600 p-6 pr-8 min-w-80 rounded-r-full flex justify-center"
                  v-if="item.title"
                >
                  {{ item.title || '--' }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- info[3].list -->
        <div class="grid grid-rows-2 grid-cols-9 gap-10 h-164 mt-20 mx-main">
          <div
            class="rounded-main text-fff relative"
            v-for="(item, index) in info[3].list"
            :key="index"
            :class="
              index === 0
                ? ['row-span-2', 'col-span-4', 'bg-fdf2e0']
                : index === 1
                ? ['col-span-5', 'bg-f5f4d6']
                : ['row-span-1', 'col-span-5', 'bg-f9ebea']
            "
          >
            <div class="p-main absolute z-10 flex flex-col justify-between">
              <div class="text-18 font-600">{{ item.title }}</div>
              <div class="text-tip text-12 pt-10 flex items-center">
                {{ item.subTitle }}
                <i class="iconfont text-10">&#xe671;</i>
              </div>
            </div>
            <div
              class="border-main text-main px-10 py-6 border-2 border-solid rounded-8 absolute top-100 left-main"
              v-if="index === 0"
            >
              立即邀请
            </div>
            <div class="w-50 h-50 absolute right-0 bottom-10">
              <el-image class="w-full h-full opacity-60" :src="item.img" fit="cover" />
            </div>
          </div>
        </div>
        <!-- 家空间 -->
        <div class="mt-20 mx-main">
          <Title :title="info[4].title" :subTitle="info[4].subTitle" :isMore="true" />
          <div class="mt-main grid grid-rows-5 grid-cols-6 gap-main h-230">
            <div
              class="bg-000 rounded-main text-fff relative overflow-hidden shadow-md"
              :class="{
                'row-span-3 col-span-3': index === 0 || index === 1,
                'row-span-2 col-span-2': index === 2 || index === 3 || index === 4,
              }"
              v-for="(item, index) in info[4].list"
              :key="index"
            >
              <el-image class="w-full h-full" :src="item.img" fit="cover"></el-image>
              <div class="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                <div class="bg-000-6 text-fff rounded-full px-10 py-4">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 公司介绍 -->
        <div class="mx-main mt-20">
          <Title :title="info[5].title" :subTitle="info[5].subTitle" :isMore="true" />
          <div class="mt-main p-10 bg-000-04 rounded-main grid grid-rows-2 grid-cols-2 gap-main">
            <div v-for="item in info[5].list" :key="item" class="relative h-100 rounded-main overflow-hidden">
              <image class="w-full h-full bg-cover" :src="item.img" alt="" />
              <div
                class="absolute left-0 top-0 bottom-0 right-0 z-1 bg-000-2 text-fff flex justify-center items-center"
              >
                {{ item.title }}
                <div
                  class="w-18 h-18 rounded-full bg-000-5 flex justify-center items-center ml-6 animation-zoom-in-out"
                >
                  <i class="iconfont text-10 text-fff">&#xe674;</i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 品牌介绍 -->
        <div class="mx-main mt-20 pb-20">
          <Title :title="info[6].title" :subTitle="info[6].subTitle" />
          <el-image
            class="rounded-main mt-main overflow-hidden w-full"
            v-if="info[6].img"
            :src="info[6].img"
            fit="cover"
          />
          <video
            class="w-full h-200 rounded-main mt-main"
            v-if="info[6].video"
            :src="info[6].video"
            controls="controls"
          />
          <div class="container-scroll">
            <div
              class="mt-main ml-main first-0 shadow-md inline-block"
              v-for="(item, index) in info[6].list"
              :key="index"
            >
              <div class="h-full overflow-hidden rounded-main relative">
                <el-image class="w-140 h-200" :src="item.img" fit="cover" />
                <div
                  class="absolute bottom-0 left-0 right-0 flex justify-center items-center text-fff bg-main text-16 font-600"
                >
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="content flex-1 h-full">
        <div class="right-box container-scroll-y" v-if="info?.length">
          <div class="hot_imgs">
            <div class="title">{{ info[pageIndex].title || '设置' }}</div>
            <div class="title-text">
              建议尺寸：{{
                pageIndex === 0
                  ? '750 * 700'
                  : pageIndex === 1
                  ? '148 * 100'
                  : pageIndex === 2
                  ? '250 * 300'
                  : pageIndex === 3
                  ? '100 * 100'
                  : pageIndex === 4
                  ? '332 * 260'
                  : pageIndex === 5
                  ? '313 * 200'
                  : pageIndex === 6
                  ? '280 * 400'
                  : pageIndex === 7
                  ? '100 * 100'
                  : ''
              }}px，拖拽图片可调整图片顺序
            </div>
            <div class="flex flex-wrap mt-20 items-center" v-show="[1, 2, 3, 4, 5, 6, 7].includes(pageIndex)">
              <span style="width: 70px">模块名称：</span>
              <div class="flex-1">
                <el-input v-model="info[pageIndex].title" placeholder="请填写名称" />
              </div>
            </div>
            <div class="flex flex-wrap mt-20 items-center" v-show="[2, 3, 4, 5, 6, 7].includes(pageIndex)">
              <span style="width: 70px">二级标签：</span>
              <div class="flex-1">
                <el-input v-model="info[pageIndex].subTitle" placeholder="请填写名称" />
              </div>
            </div>
            <div class="flex flex-wrap mt-20 items-center">
              <span style="width: 70px">模块备注：</span>
              <div class="flex-1">
                <el-input v-model="info[pageIndex].remark" placeholder="请填写名称" />
              </div>
            </div>
            <div class="add-btn" v-show="pageIndex === 6">
              <el-button
                type="primary"
                style="width: 100px; height: 35px; background-color: var(--prev-color-primary); color: #ffffff"
                @click="getvideoint"
                >{{ info[pageIndex].video ? '修改视频' : '添加视频' }}
              </el-button>
              <video
                class="w-full h-200 rounded-main mt-main"
                style="max-width: 300px"
                v-if="info[6].video"
                :src="info[6].video"
                controls="controls"
              />
              <div class="mt-10"></div>
              <el-button type="primary" class="w-100 h-36" @click="modalPicTap('单选', -1)"
                >{{ info[pageIndex].img ? '修改图片' : '添加图片' }}
              </el-button>
              <div class="mt-10">
                <el-image
                  class="rounded-main overflow-hidden w-full"
                  style="max-width: 300px"
                  v-show="info[6].img"
                  :src="info[6].img"
                  fit="cover"
                />
              </div>
            </div>
            <div class="list-box">
              <draggable
                class="dragArea list-group"
                :list="info[pageIndex]?.list || []"
                group="peoples"
                handle=".move-icon"
              >
                <div class="item" v-for="(item, index) in info[pageIndex].list || []" :key="index">
                  <div class="delect-btn" @click.stop="bindDelete(item, index)">
                    <i class="el-icon-circle-close" style="font-size: 24px" />
                  </div>
                  <div class="move-icon">
                    <span class="iconfont icondrag2"></span>
                  </div>
                  <div class="img-box" @click="modalPicTap('单选', index)">
                    <img :src="item.img" alt="" v-if="item.img" />
                    <div class="upload-box" v-else>
                      <i class="el-icon-picture-outline" style="font-size: 24px"></i>
                    </div>
                    <div class="delect-btn" @click.stop="deleteImg(item, index)">
                      <i class="el-icon-circle-close" style="font-size: 24px" />
                    </div>
                  </div>
                  <div class="info">
                    <div class="info-item">
                      <span style="width: 70px">标题 (备注)</span>
                      <div class="input-box">
                        <el-input v-model="item.title" placeholder="请填写标题 (备注)" />
                      </div>
                    </div>
                    <div class="info-item" v-show="[3].includes(pageIndex)">
                      <span style="width: 70px">二级标题</span>
                      <div class="input-box">
                        <el-input v-model="item.subTitle" placeholder="请填写二级标题" />
                      </div>
                    </div>
                    <div class="info-item">
                      <span style="width: 70px">链接位置</span>
                      <div class="input-box">
                        <el-select v-model="item.type">
                          <el-option :value="1" label="案例详情"></el-option>
                          <el-option :value="2" label="文章详情"></el-option>
                          <el-option :value="3" label="公司介绍"></el-option>
                          <el-option :value="4" label="品牌介绍"></el-option>
                          <el-option :value="11" label="自定义路径"></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="info-item" v-show="item.type === 11">
                      <span style="width: 70px">自定义</span>
                      <div class="input-box">
                        <el-select v-model="item.router">
                          <el-option :value="1" label="第一表单"></el-option>
                          <el-option :value="2" label="第二表单"></el-option>
                          <el-option :value="3" label="第三表单"></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="info-item" v-show="[1, 2,3,4].includes(item.type)">
                      <span style="width: 70px">ID</span>
                      <div class="input-box">
                        <el-input v-model="item.id" />
                      </div>
                    </div>
                  </div>
                </div>
              </draggable>
            </div>
            <template>
              <div class="add-btn">
                <el-button
                  v-show="info[pageIndex].list.length < info[pageIndex].maxLength"
                  type="primary"
                  ghost
                  style="width: 100px; height: 35px; background-color: var(--prev-color-primary); color: #ffffff"
                  @click="addBox"
                  >添加模块
                </el-button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="modalPic"
      width="950px"
      title="上传商品图"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <uploadPictures
        :isChoice="isChoice"
        @getPic="getPic"
        :gridBtn="gridBtn"
        :gridPic="gridPic"
        v-if="modalPic"
      ></uploadPictures>
    </el-dialog>
    <el-dialog :visible.sync="modalVideo" width="720px" title="上传视频" :close-on-click-modal="false">
      <uploadVideo v-if="modalVideo" @getVideo="getvideo"></uploadVideo>
    </el-dialog>
  </div>
</template>

<script>
import WangEditor from '@/components/wangEditor/index.vue';
import Title from '@/components/title/index.vue';
import Setting from '@/setting';
import { mapState } from 'vuex';
import editFrom from '@/components/from/from';
import uploadVideo from '@/components/uploadVideo2';
import { postSaveData, getAllData } from '@/api/system';
import draggable from 'vuedraggable';
import uploadPictures from '@/components/uploadPictures';

export default {
  name: 'list',
  components: {
    Title,
    editFrom,
    draggable,
    uploadPictures,
    WangEditor,
    uploadVideo,
  },
  computed: {
    labelWidth() {
      return this.isMobile ? undefined : '120px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
    ...mapState('admin/layout', ['menuCollapse']),
  },
  data() {
    return {
      swiperOption: {
        //自动轮播
        autoplay: false,
        //开启循环模式
        loop: true,
      },
      info: [],
      pageIndex: 0,
      pageNextIndex: 0,

      //活动
      actives: [],
      // 家·空间
      spaces: [],
      introduces: [],
      modalVideo: false,
      video: '',

      name: '',
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      loading: false,
      sginList: [],
      progress: 0, // 进度条默认0

      BaseURL: Setting.apiBaseURL.replace(/adminapi/, ''),
      theme3: 'light',
      tabList: [],
      uploadData: {}, // 上传参数

      isChoice: '单选',
      modalPic: false,
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      },
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8,
      },
      activeIndex: 0,
      sortName: null,
      activeIndexs: 0,
      cmsList: [],
      loadingExist: false,
      type: 0,
      upload: {
        videoIng: false, // 是否显示进度条；
      },
    };
  },
  created() {},
  mounted() {
    this.getInfo();
  },
  methods: {
    getvideoint() {
      this.modalVideo = true;
    },
    getvideo(data) {
      this.modalVideo = false;
      this.info[this.pageIndex].video = data;
    },
    getInfo() {
      getAllData()
        .then(async (res) => {
          console.log(res.data);
          this.info = res.data.data;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    // 左边菜单点击
    edits(row, index) {
      console.log(row, index);
      this.pageIndex = index;
      this.name = row.name || '';
    },
    // 右边 - 添加数据
    addBox() {
      this.info[this.pageIndex].list.push({
        title: '',
        subTitle: '',
        img: '',
        id: '',
        type: '',
      });
    },
    deleteImg(item, index) {
      this.info[this.pageIndex].list[index].img = '';
    },
    // 删除
    bindDelete(item, index) {
      this.info[this.pageIndex].list.splice(index, 1);
    },
    // 点击图文封面
    modalPicTap(title, index) {
      this.pageNextIndex = index;
      this.modalPic = true;
    },
    // 获取图片信息
    getPic(pc) {
      console.log(pc.att_dir);
      this.$nextTick(() => {
        if (this.pageNextIndex === -1) {
          this.info[this.pageIndex].img = pc.att_dir;
        } else {
          this.info[this.pageIndex].list[this.pageNextIndex].img = pc.att_dir;
        }

        this.modalPic = false;
      });
    },
    // 保存
    save() {
      postSaveData(this.info)
        .then((res) => {
          this.$message.success(res.msg);
          this.getInfo();
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .ivu-menu-vertical .ivu-menu-item-group-title {
  display: none;
}

::v-deep .ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}

::v-deep.ivu-form-item-content {
  margin-left: 0px !important;
}

.nofont {
  text-align: center;
  line-height: 123px;
}

.nofonts {
  text-align: center;
  line-height: 105px;
}

.save {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  bottom: 0;
  padding: 16px;
  border-top: 3px solid #f5f7f9;
}

.form {
  .goodsTitle {
    margin-bottom: 25px;
  }

  .goodsTitle ~ .goodsTitle {
    margin-top: 20px;
  }

  .goodsTitle .title {
    border-bottom: 2px solid var(--prev-color-primary);
    padding: 0 8px 12px 5px;
    color: #000;
    font-size: 14px;
  }

  .goodsTitle .icons {
    font-size: 15px;
    margin-right: 8px;
    color: #999;
  }

  .add {
    font-size: 12px;
    color: var(--prev-color-primary);
    padding: 0 12px;
    cursor: pointer;
  }

  .radio {
    margin-right: 20px;
  }

  .upLoad {
    width: 58px;
    height: 58px;
    line-height: 58px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.02);
  }

  .iconfont {
    color: #898989;
  }

  .pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
  }

  .pictrue img {
    width: 100%;
    height: 100%;
  }
}

.agreement-box {
  width: 310px;
  height: 550px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #eeeeee;
  opacity: 1;
  position: relative;

  .template {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    background-color: #817e81;
  }

  .htmls_box {
    font-size: 12px;
    width: 259px;
    height: 430px;
    border-radius: 10px;
    background-color: #fff;
    position: absolute;
    top: 58px;
    left: 26px;

    .htmls_top {
      position: absolute;
      top: 8px;
      left: 0;
      height: 34px;
      text-align: center;
      width: 100%;
      line-height: 35px;
      font-weight: 600;
      font-size: 20px;
    }

    .htmls_font {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 15px 15px;
      text-align: center;
      width: 100%;

      div {
        height: 35px;
        line-height: 35px;
        border-radius: 20px;
      }

      .ok {
        background-color: #f33316;
        color: #ffffff;
      }
    }

    .htmls {
      position: absolute;
      background-color: #fff;
      top: 50px;
      left: 0;
      width: 259px;
      height: 281px;
      border-radius: 4px;
      overflow: auto;
      padding: 5px 15px;
      word-break: break-word;
    }

    .htmls::-webkit-scrollbar {
      display: none;
    }
  }
}

.Bbox {
  width: 495px;
  display: flex;
  flex-wrap: wrap;
}

.item {
  margin-right: 15px;
  border: 1px dashed #dbdbdb;
  padding-bottom: 10px;
  padding-right: 15px;
  padding-top: 20px;
}

.items {
  margin-right: 15px;
  border: 1px dashed #dbdbdb;
  padding-bottom: 10px;
  padding-top: 15px;
  position: relative;
  display: flex;
  margin-top: 20px;

  .move-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 80px;
    cursor: move;
    color: #d8d8d8;
  }

  .img-box {
    position: relative;
    width: 80px;
    height: 80px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    flex: 1;
    margin-left: 22px;

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      span {
        // width 40px
        font-size: 13px;

        .input-box {
          flex: 1;
        }
      }
    }
  }

  .delect-btn {
    position: absolute;
    right: -12px;
    top: -12px;
    color: #999999;
  }
}

.table {
  width: 700px;
  color: #515a6e;
  font-size: 14px;
  background-color: #fff;
  margin-left: 20px;
}

.contents {
  width: 150px;

  .right-box {
    margin-left: 40px;
  }

  .title-text {
    width: 500px;
  }
}

.pciframe {
  margin-left: 20px;
  width: 430px;
  height: 280px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 13px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .pciframe-box {
    background: rgba(0, 0, 0, 0);
    // border: 1px solid #EEEEEE;
    border-radius: 4px;
  }

  .pcmoddile_goods {
    position: absolute;
    top: 69px;
    width: 171px;
    height: 140px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    left: 65px;
    background-color: #fff;
  }

  .pcswiperimg_goods {
    height: 140px;
    background-color: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.link {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.25);
  opacity: 1;
  cursor: pointer;

  .you {
    color: #999999;
    float: right;
    margin-right: 11px;
  }
}

.swiperimg {
  width: 310px;
  max-height: 126px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

.swiperimgs {
  width: 310px;
  height: 100%;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

.swiperimg_goods {
  width: 284px;
  height: 124px;
  border-radius: 4px;
  line-height: 99px;
  text-align: center;
  background-color: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
  }
}

.title {
  padding: 0 0 13px 0;
  font-weight: bold;
  font-size: 15px;
  border-left: 2px solid var(--prev-color-primary);
  height: 23px;
  padding-left: 10px;
}

.title-text {
  padding: 0 0 0px 16px;
  color: #999;
  font-size: 12px;
  margin-top: 10px;
}

.content {
  // width 510px;
display: flex;
flex-direction: column;
height: 100%;
margin-left: 20px;

  .right-box {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

.box {
  border-top: 3px solid #f5f7f9;
  padding: 10px;
  padding-top: 25px;
  width: 100%;

  .save {
    background-color: var(--prev-color-primary);
    color: #ffffff;
    width: 71px;
    height: 30px;
    margin: 0 auto;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}

.iframe {
  margin-left: 20px;
  position: relative;
  width: 310px;
  height: 550px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  opacity: 1;
  border-radius: 10px;
}

.moddile {
  position: absolute;
  width: 310px;
  height: 550px;
  top: 0px;
  opacity: 0;
  left: 0px;
  border-radius: 4px;
}

.moddile_box {
  position: absolute;
  top: 0px;
  width: 310px;
  height: 115px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  left: 0px;
  background-color: #f5f5f5;
}

.moddile_goods {
  position: absolute;
  top: 12px;
  width: 284px;
  height: 124px;
  /* border-top-left-radius: 10px; */
  /* border-top-right-radius: 10px; */
  border-radius: 5px;
  left: 13px;
  line-height: 99px;
  text-align: center;
  background-color: #f5f5f5;
}

.iframe-box {
  width: 310px;
  height: 100%;
  border-radius: 10px;
  // margin: 30px 15px 0px 15px
  background: rgba(0, 0, 0, 0);
  border: 1px solid #eeeeee;
  opacity: 1;

  img {
    width: 100%;
    height: 100%;
  }
}

.left-wrapper {
  min-width: 213px;
  background: #fff;
  border-right: 1px solid #f2f2f2;
  height: auto !important;
}

.menu-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  word-break: break-all;

  .icon-box {
    z-index: 3;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
  }

  &:hover .icon-box {
    display: block;
  }

  .right-menu {
    z-index: 10;
    position: absolute;
    right: -106px;
    top: -11px;
    width: auto;
    min-width: 121px;
  }
}

.tabBox_img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}

.ivu-menu {
  z-index: auto;
}

.icondrag2 {
  font-size: 26px;
  color: #d8d8d8;
}

.hot_imgs {
  margin-bottom: 20px;

  .title {
    font-size: 14px;
  }

  .list-box {
    margin-top: 14px;
    .item {
      position: relative;
      display: flex;
      margin-top: 14px;

      .move-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 80px;
        cursor: move;
        color: #d8d8d8;
      }

      .img-box {
        position: relative;
        width: 80px;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        flex: 1;
        margin-left: 22px;

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          span {
            // width 40px
            font-size: 13px;
          }

          .input-box {
            flex: 1;
          }
        }
      }

      .delect-btn {
        position: absolute;
        right: -12px;
        top: -12px;
        color: #999999;
      }
    }
  }

  .add-btn {
    margin-top: 14px;
  }
}

.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ccc;
}

.iframe-boxs::-webkit-scrollbar {
  display: none;
}

.sgin_iframe::-webkit-scrollbar {
  display: none;
}
.content1 {
  height: 560px;
  overflow: hidden;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

.content1::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.iframe-boxs {
  width: 310px;
  height: 550px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #eeeeee;
  opacity: 1;
  overflow: auto;

  .moneyBox {
    background-color: var(--color-theme);
    height: 414px;
    border-radius: 10px;

    .box1 {
      text-align: center;
      color: #ffffff;
      padding-bottom: 15px;

      .font1 {
        padding-top: 20px;
        // padding-bottom 15px
        font-size: 12px;
        opacity: 0.6;
      }

      .font2 {
        font-size: 30px;
        font-style: normal;
        opacity: 0.9;
      }
    }

    .moneyBox_content {
      background-color: #ffffff;
      height: 317px;
      border-radius: 4px;

      .box2 {
        display: flex;
        justify-content: space-around;
        height: 35px;
        line-height: 35px;
        margin-bottom: 10px;

        div:nth-child(1) {
          font-weight: bold;
          border-bottom: 2px solid var(--color-theme);
        }
      }

      .box3 {
        padding: 0px 10px;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;

        .box3_box {
          width: 90px;
          height: 55px;
          border-radius: 9px;
          background-color: #f4f4f4;
          color: #888;
          margin-bottom: 10px;
          text-align: center;
          padding-top: 3px;
          font-size: 19px;
          margin-right: 3px;
          margin-left: 3px;

          .font {
            font-size: 11px;
            font-style: normal;
          }
        }

        .box3_box:nth-child(1) {
          width: 90px;
          height: 55px;
          border-radius: 9px;
          background-color: var(--color-theme);
          color: #ffffff;
          text-align: center;
          padding-top: 3px;
          margin-right: 3px;
          margin-left: 3px;
        }

        .other {
          line-height: 55px;
        }
      }

      .box4 {
        padding: 0px 10px;

        .tips {
          font-size: 14px;
          color: #333333;
          font-weight: 800;
          margin-bottom: 7px;
          margin-top: 10px;
        }

        .tips-samll {
          font-size: 12px;
          color: #333333;
          margin-bottom: 7px;

          p {
            margin: 2px 0px;
          }
        }
      }

      .box5 {
        font-size: 15px;
        width: 225px;
        height: 40px;
        border-radius: 25px;
        margin: 23px auto 0 auto;
        line-height: 40px;
        text-align: center;
        background-color: var(--color-theme);
        color: #ffffff;
      }
    }
  }
}

.bnt {
  // width 80px!important
}

::v-deep.ivu-page-header {
  border-bottom: unset;
  position: fixed;
  z-index: 9;
  width: 100%;
}

::v-deep.i-layout-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}

.box-video-style {
  width: 100%;
  height: 180px;
  border-radius: 10px;
  background-color: #707070;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}

.box-video-style .iconv {
  color: #fff;
  line-height: 180px;
  width: 50px;
  height: 50px;
  display: inherit;
  font-size: 26px;
  position: absolute;
  top: -74px;
  left: 50%;
  margin-left: -25px;
}

.box-video-style .mark {
  position: absolute;
  width: 100%;
  height: 30px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.tree-vis {
  display: flex;
  flex-direction: column;
  .tab-item {
    padding: 15px 20px;
    cursor: pointer;
  }
  .active {
    background-color: var(--prev-bg-main-color);
    color: var(--prev-color-primary);
    border-right: 2px solid var(--prev-color-primary);
  }
}
.mt-20 {
  margin-top: 20px;
}

.container-scroll {
  overflow-x: scroll; /* 启用横向滚动条 */
  overflow-y: hidden;
  white-space: nowrap; /* 防止内容换行 */
  &::-webkit-scrollbar {
    width: 8px; /* 设置滚动条的宽度 */
    height: 8px; /* 设置滚动条的高度 */
  }

  /* 设置滚动条内滑块的样式 */
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey; /* 设置滑块的颜色 */
    border-radius: 4px; /* 设置滑块的圆角 */
  }

  /* 设置滚动条内的滑道样式 */
  &::-webkit-scrollbar-track {
    background-color: lightgrey; /* 设置滑道的颜色 */
    border-radius: 4px; /* 设置滑道的圆角 */
  }
  .item {
    display: inline-block; /* 使子元素水平排列 */
  }
}

.container-scroll-y {
  &::-webkit-scrollbar {
    width: 8px; /* 设置滚动条的宽度 */
    height: 8px; /* 设置滚动条的高度 */
  }

  /* 设置滚动条内滑块的样式 */
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey; /* 设置滑块的颜色 */
    border-radius: 4px; /* 设置滑块的圆角 */
  }

  /* 设置滚动条内的滑道样式 */
  &::-webkit-scrollbar-track {
    background-color: lightgrey; /* 设置滑道的颜色 */
    border-radius: 4px; /* 设置滑道的圆角 */
  }
}
.first-0:first-child {
  margin-left: 0;
}
</style>
