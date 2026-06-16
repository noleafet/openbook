package com.leafnote.openbook.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import com.leafnote.openbook.dto.UserDTO;

public interface UserService {

    public UserDTO addUser(UserDTO userDTO);

    public UserDTO getUserById(Long id);

    public UserDTO getUserByUsername(String username);

    public UserDTO updateUser(Long id, UserDTO userDTO);
    
    public void deleteUserById(Long id);

    public List<UserDTO> getAllUsers();

    public UserDetails loadUserByUsername(String username);

}
