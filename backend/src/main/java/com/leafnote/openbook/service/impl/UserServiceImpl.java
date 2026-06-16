package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.UserDTO;
import com.leafnote.openbook.exception.ResourceNotFoundException;
import com.leafnote.openbook.mapper.UserMapper;
import com.leafnote.openbook.model.Role;
import com.leafnote.openbook.model.User;
import com.leafnote.openbook.repository.UserRepository;
import com.leafnote.openbook.security.UserSecurity;
import com.leafnote.openbook.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.encoder = encoder;
    }

    @Override
    public List<UserDTO> getAllUsers() {

        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public UserDTO addUser(UserDTO userDTO) {

        User user = userMapper.toEntity(userDTO);
        user.setPassword(encoder.encode(userDTO.password())); 
        
        if (userDTO.roles() == null || userDTO.roles().isEmpty()) {
            user.setRoles(Set.of(Role.ROLE_USER));
        } else {
            user.setRoles(userDTO.roles());
        }

        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userMapper.toDTO(userRepository.findById(id)
                .orElseThrow((() -> new ResourceNotFoundException(User.class, "id", id))));
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        return userMapper.toDTO(userRepository.findByUsername(username)
                .orElseThrow((() -> new ResourceNotFoundException(User.class, "username", username))));
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(User.class, "id", id));

        if (!userDTO.name().isEmpty()) existingUser.setName(userDTO.name());
        if (!userDTO.email().isEmpty()) existingUser.setEmail(userDTO.email());
        if (!userDTO.password().isEmpty()) existingUser.setPassword(encoder.encode(userDTO.password()));
        if (userDTO.roles().size()!=0) existingUser.setRoles(userDTO.roles());

        userRepository.save(existingUser);

        return userMapper.toDTO(existingUser);

    }

    @Transactional
    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException(User.class, "username", username));
        
        return new UserSecurity(user);
    }
}
