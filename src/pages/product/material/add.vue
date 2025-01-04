<template>
    <el-dialog :visible.sync="modal" title="商品材质" width="1000px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="材质名称：" prop="name">
                <el-input placeholder="请输入材质名称" v-model="form.name" />
            </el-form-item>
            <el-form-item label="图片：">
                <el-upload ref="upload" :action="fileUrl" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :headers="headers" :on-success="handleSuccess" :file-list="fileList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onClose">取消</el-button>
            <el-button type="primary" @click="add">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { set_material } from '@/api/product.js'
import Setting from '@/setting';
import { getCookies, removeCookies } from '@/libs/util';
export default {
    // props: {
    //     id: {
    //         type: [String, Number], // 限制参数类型为 string 或 number
    //         default: '', // 设置默认值为 ''
    //     },
    // },
    data() {
        return {
            id: '',
            modal: false,
            form: {
                name: '',
            },
            rules: {
                name: [{ required: true, message: '请输入材质名称', trigger: 'blur' }],
            },
            fileUrl: Setting.apiBaseURL + '/file/upload',
            imageUrl: '',
            dialogImageUrl: '',
            dialogVisible: false,
            token: 'Bearer ' + getCookies('token'),
            headers: {
                'Authori-zation': 'Bearer ' + getCookies('token')
            },
            fileList: [],
        }
    },
    // 监听事件
    watch: {
        dialogImageUrl: {
            handler(newName) {
                var aa = document.querySelector('.el-upload--picture-card')
                if (newName !== '') {
                    aa.style.display = 'none'
                } else {
                    setTimeout(() => {
                        aa.style.display = 'inline-block'
                    }, 1100)
                }
            }
        },
        modal(val) {
            if (!val) {
                this.fileList = []
                this.dialogImageUrl = ''
            }
        }
    },
    methods: {
        getIofo(row) {
            console.log(row);
            this.id = row.id
            this.form.name = row.name
            this.dialogImageUrl = row.image
            console.log(this.form.name);
            this.fileList.push({
                url: row.image
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            console.log(this.dialogImageUrl, '删除');
            this.dialogImageUrl = ''
        },
        handlePictureCardPreview(file) {
            console.log(file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleSuccess(res) {
            console.log(res);
            let str = process.env.VUE_APP_API_URL + res.data.src
            this.dialogImageUrl = str.replace('/adminapi', '');
            console.log(Setting.apiBaseURL);
        },
        onClose() {
            this.form.name = ''
            this.dialogImageUrl = ''
            // this.handleRemove()
            this.$refs.upload.clearFiles()
            this.modal = false
            this.fileList = []
        },
        add() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    let name = this.form.name
                    let image = this.dialogImageUrl
                    let id = this.id
                    if (id == '') {
                        set_material({
                            name,
                            image
                        }).then(res => {
                            this.onClose()
                            this.$emit('upd')
                        })
                    } else {
                        set_material({
                            id,
                            name,
                            image
                        }).then(res => {
                            this.onClose()
                            this.$emit('upd')
                        })
                    }


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #8c939d !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>