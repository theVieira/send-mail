import { config } from 'dotenv'
import nodemailer from 'nodemailer'
import { z } from 'zod'

config()

const envSchema = z.object({
	MAIL_HOST: z.string(),
	MAIL_PASS: z.string(),
	MAIL_USER: z.string(),
	MAIL_ADDRESS: z.string(),
	MAIL_NAME: z.string(),
	MAIL_PORT: z.string(),
})

const { MAIL_HOST, MAIL_PASS, MAIL_USER, MAIL_ADDRESS, MAIL_NAME, MAIL_PORT } =
	envSchema.parse(process.env)

const transport = nodemailer.createTransport({
	host: MAIL_HOST,
	port: Number(MAIL_PORT),
	auth: {
		user: MAIL_USER,
		pass: MAIL_PASS,
	},
})

const name = 'Lorem Ipsum'

transport.sendMail(
	{
		from: { address: MAIL_ADDRESS, name: MAIL_NAME },
		to: [{ address: 'gabrielvieiraguimaraes4@gmail.com', name: name }],
		subject: 'Welcome to Trackit',
		html: `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Pattern</title>
				<style>
					body {
						background: #131313;
						color: #cecece;
					}
					#app-name,
					#name {
						color: rgb(172, 49, 221);
					}
					#app-link {
						text-decoration: none;
						color: rgb(172, 49, 221);
						font-size: 1.2rem;
						font-weight: 600;
						transition: 0.2s;
					}
					#app-link:hover {
						filter: brightness(120%);
					}
				</style>
			</head>
			<body>
				<h1>
					Olá <span id="name">${name}</span>, bem vindo ào
					<em><span id="app-name">Trackit</span>, seu sistema de chamados</em>
				</h1>
				<h3>
					Seu cadastro foi concluído com sucesso e você já pode acessar a plataforma
				</h3>
				<a
					id="app-link"
					href="http://google.com.br"
					target="_blank"
					rel="noopener noreferrer"
					>Ir para o site</a
				>
			</body>
		</html>

`,
	},
	(err, info) => {
		if (err) {
			console.log('Erro ao enviar email: ' + err)
			return
		}

		console.log('Email enviado com sucesso! ' + info.response)
		return
	}
)
