<template>
    <q-page class="row  items-center justify-center">
        <q-card class="login-card">
            <q-card-section>
                <div class="text-h6">{{ $t('login_title') }}</div>
            </q-card-section>
            <q-card-section>
                <q-form ref="loginForm">
                    <div class="row q-col-gutter-md">
                        <div class="col-sm-12">
                            <q-input
                              filled
                              lazy-rules
                              v-model="fields.email"
                              :label="$t('email')"
                              :error="Boolean(serverErrors.email)"
                              :error-message="serverErrors.email"
                              :rules="fieldsRules.email"
                              @blur="checkFormErrors"
                              @change="resetServerError('email')"
                            />
                        </div>
                        <div class="col-xs-12">
                            <q-input
                              filled
                              lazy-rules
                              v-model="fields.password"
                              :label="$t('password')"
                              :rules="fieldsRules.password"
                              :error="Boolean(serverErrors.password)"
                              :error-message="serverErrors.password"
                              @blur="checkFormErrors"
                              @change="resetServerError('password')"
                            />
                        </div>
                    </div>
                </q-form>
            </q-card-section>
            <q-card-actions align="right" class="justify-between">
                <q-btn
                  icon="lock_reset"
                  color="grey"
                  flat
                  padding="sm"
                  to="/password-reset"
                >
                    {{ $t('forgot_password_btn') }}
                </q-btn>
                <q-btn
                  icon="login"
                  color="green"
                  padding="sm"
                  :disabled="!isFormValid"
                  @click="login()"
                >
                    &nbsp; {{ $t('login_btn') }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
import validationMixin from "src/mixins/validationMixin";
import { useUserStore } from 'stores/user';

export default {
    name: "Login",
    mixins: [validationMixin],
    setup() {
        const userStore = useUserStore();
        return { userStore }
    },
    data () {
        return {
            fields: {
                email: null,
                password: null,
            },
            fieldsRules: {
                email: this.emailValidator(),
                password: this.passwordValidator(),
            },
        }
    },
    methods: {
        login() {
            if (this.isFormRulesValid) {
                this.$api.post('login', this.fields).then((data) => {
                    console.log(data);

                    this.$api.interceptors.request.use((config) => {
                        config.headers.Authorization = `Bearer ${data.data.token}`;
                        return config;
                    });

                    this.userStore.info = data.data.user;
                    this.userStore.userId = data.data.user.id;
                    localStorage.setItem('accessToken', data.data.token);
                }).catch((error) => {
                    this.serverErrors = error.response.data.errorsList;
                    this.$refs.loginForm.validate();
                });
            }
        },
    },
}
</script>

<style scoped>
    .login-card {
        width: 400px;
        margin-bottom: 200px;
    }
</style>