import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import React from 'react';
import appConfig from '../config.json';

/* 
Supabase.com
Back-end como serviço
Será um repositório que recebe a mensagem e devolve 
Ver Artigo como fazer AJAX do Mario Souto
*/
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ4NjQ4MywiZXhwIjoxOTU5MDYyNDgzfQ.U7jfrfsdOu0yI6etPU9JC6dZGEiECuxfpbF0VyilVUU';
const SUPABASE_URL = 'https://xuhhvzlhyrskzhgkourb.supabase.co';

const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
//Cria cliente supabase

export default function ChatPage() {
    // Sua lógica vai aqui
    /*Usuário
    - Usuário digita no campo textArea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem

    Dev
    - Campo já criado
    - Vamos usar o onChange usa o useState (ter if para caso seja enter para limpar a variável)
    - Lista de mensagens
    */
    const [mensagem, setMensagem] = React.useState('');
    const [listademensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(()=>{
        supabaseClient
        .from('mensagens')
        .select('*')
        .order('id',{ascending:false})
        .then(({data})=>{
            console.log('Dados da consulta: ',data);
            setListaDeMensagens(data);/*Ativado quando a lista de mensagens mudar */
        });
    /* order('id',{ascending:false}) determina a ordem com que as mensagens vem */
    },[]);

    function handleNovaMensagem(NovaMensagem) {
        const mensagem = {

            de: "diegodreossi",
            texto: NovaMensagem
        };

        supabaseClient
            .from('mensagens')
            .insert([mensagem])
            .then(({data})=>{
                //console.log('Criando mensagem: ',data[0]);
                setListaDeMensagens([
                    //Mensagem na ordem certa
                    data[0],
                    ...listademensagens
                ]);
            });
        /*No insert tem que ser um objeto com os mesmos campos escritos no supabase*/
        setMensagem('');//Limpa a caixa de texto
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    { <MessageList mensagens={listademensagens} />}
                    
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;

                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    //O comportamento padrão do enter é quebrar a linha
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return ({/*overflow:''scroll aparece a barra de rolagem horizontal e lateral */},
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}

        </Box>
    )
}