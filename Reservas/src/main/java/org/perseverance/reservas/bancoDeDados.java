package org.perseverance.reservas;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "usuarios")
public class bancoDeDados {
    // Implementação de acesso ao banco de dados deve ser adicionada aqui.
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Geração automática de UUID para o ID do usuário
    @Column(name = "id", updatable = false, nullable = false) // Configurações para a coluna ID
    private UUID id; // Usando UUID para garantir unicidade global

    @Column(name = "username", nullable = false, unique = true) // Configurações para a coluna username
    private String username;

    @Column(name = "email", nullable = false, unique = true) // Configurações para a coluna email
    private String email;

    @Column(name = "password", nullable = false) // Configurações para a coluna password
    private String password;
}

