package org.perseverance.reservas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador MVC responsável por expor a página de tabela de reservas.
 * Atualmente retorna apenas a view Thymeleaf chamada "tabela".
 */
@Controller
public class caminho {

    /**
     * Mapeia as rotas de acesso principal do sistema.
     * @return nome da view Thymeleaf que renderiza a tabela de itens.
     */
    @GetMapping({"/", "/tabela"})
    public String tabela() {
        return "tabela";
    }
    /* Caminho para login quando for clicado em "Login" */
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    /* Caminho para registro quando for clicado em "Registrar" */
    @GetMapping("/register")
    public String register() {
        return "register";
    }
}



