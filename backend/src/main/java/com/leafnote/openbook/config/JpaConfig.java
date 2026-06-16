package com.leafnote.openbook.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfig {

    @Bean(name = "auditorProvider")
    public AuditorAware<String> auditorProvider() {
        return new JpaAuditorProvider();
    }
}
