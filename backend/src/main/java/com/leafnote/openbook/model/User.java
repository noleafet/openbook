package com.leafnote.openbook.model;

import java.util.HashSet;
import java.util.Set;

import com.leafnote.openbook.util.RoleCollectionConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity // Marks this class as a persistent entity
@Table(name = "user") // Specifies the table name
public class User extends AbstractAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(min = 1, max = 255)
    private String name;

    @NotBlank
    @Column(unique = true)
    @Size(min = 1, max = 255)
    private String email;

    @NotBlank
    @Size(min = 1, max = 255)
    private String username;

    @NotBlank
    @Size(min = 1, max = 255)
    private String password;
    
    // Persisted as a comma-separated String, handled as a Set in Java
    @Convert(converter = RoleCollectionConverter.class)
    private Set<Role> roles = new HashSet<>();

    // Convenience helper to get roles as an array of Strings for Spring Security
    public String[] getRolesAsStrings() {
        return this.roles.stream()
                .map(Role::name)
                .toArray(String[]::new);
    }
}