{ pkgs }: {
  deps = [
    pkgs.whois
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}