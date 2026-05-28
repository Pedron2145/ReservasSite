package org.perseverance.reservas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Aplicação Spring Boot principal para o sistema de reservas.
 * Esta classe inicializa o contexto e inicia o servidor web embutido.
 */
@SpringBootApplication
public class ReservasApplication {

    /**
     * Ponto de entrada da aplicação.
     * @param args argumentos de linha de comando passados na inicialização.
     */
    public static void main(String[] args) {
        SpringApplication.run(ReservasApplication.class, args);
    }

}
