"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptNewsletter, setAcceptNewsletter] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Erro no cadastro",
        description: "Você deve aceitar os termos de uso.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const success = await register(formData)
      if (success) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Bem-vinda à Merida Store.",
        })
        router.push("/conta")
      }
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-terracotta-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sage-600 hover:text-sage-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a loja
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-sage-800">Criar conta</CardTitle>
            <CardDescription className="text-sage-600">Junte-se à Merida Store</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sage-700">
                  Nome completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  className="border-sage-200 focus:border-sage-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sage-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="border-sage-200 focus:border-sage-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sage-700">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="border-sage-200 focus:border-sage-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sage-700">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                    className="border-sage-200 focus:border-sage-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-500 hover:text-sage-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sage-700">
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    required
                    className="border-sage-200 focus:border-sage-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-500 hover:text-sage-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} className="mt-1" />
                  <Label htmlFor="terms" className="text-sm text-sage-600 leading-relaxed">
                    Aceito os{" "}
                    <Link href="/termos" className="text-sage-700 hover:underline">
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-sage-700 hover:underline">
                      política de privacidade
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={acceptNewsletter}
                    onCheckedChange={setAcceptNewsletter}
                    className="mt-1"
                  />
                  <Label htmlFor="newsletter" className="text-sm text-sage-600 leading-relaxed">
                    Quero receber ofertas exclusivas e novidades por email
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sage-600">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-sage-700 hover:text-sage-800 font-medium hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
