import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import PageForm, { PageFormItem } from '@/src/components/PageForm'
import usePageForm from '@/src/hooks/usePageForm'
import z from 'zod'

const formConfigList: PageFormItem[] = [
  {
    name: 'email',
    label: '邮箱',
    control: (field) => <Input placeholder="邮箱" {...field} />
  },
  {
    name: 'password',
    label: '密码',
    control: (field) => <Input placeholder="密码" type="password" {...field} />
  }
]

const formSchema = z.object({
  email: z.string().email('请输入正确的邮箱'),
  password: z
    .string()
    .max(50, '密码位数不能超过50个字符')
    .min(6, '密码位数不能小于6个字符')
})

export default function Login() {
  const router = useRouter()
  const form = usePageForm(formSchema)

  const handleSignIn = (formData: z.infer<typeof formSchema>) => {
    console.log('formData', formData)
    signIn('credentials', {
      username: 'admin',
      password: 'admin',
      redirect: false
    }).then((res) => {
      if (res?.status === 200) {
        router.push('/')
      }
    })
  }

  return (
    <div className="bg-gray-100 w-[100vw] h-[100vh] flex">
      <div className="w-7/12"></div>
      <div className="bg-white w-5/12 p-10">
        <h1 className="text-orange-500 font-bold text-2xl my-10 text-center">
          Sign In
        </h1>
        <div className="space-y-5">
          <PageForm
            form={form}
            configList={formConfigList}
            onSubmit={handleSignIn}
          >
            <Button type="submit" className="w-full py-5">
              Sign in
            </Button>
          </PageForm>
        </div>
      </div>
    </div>
  )
}
