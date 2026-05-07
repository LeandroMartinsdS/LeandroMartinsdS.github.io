# Only for interactive shells
[[ $- != *i* ]] && return

# ---------------- Colors ----------------
BLUE='\[\033[1;34m\]'
GREEN='\[\033[1;32m\]'
CYAN='\[\033[0;36m\]'
YELLOW='\[\033[1;33m\]'
RESET='\[\033[0m\]'

# ---------------- Git ----------------
# Load git prompt helper if available
if [ -f /usr/share/git-core/contrib/completion/git-prompt.sh ]; then
  . /usr/share/git-core/contrib/completion/git-prompt.sh
fi

export GIT_PS1_SHOWDIRTYSTATE=1
export GIT_PS1_SHOWSTASHSTATE=1
export GIT_PS1_SHOWUNTRACKEDFILES=1
export GIT_PS1_SHOWUPSTREAM="auto"

# ---------------- Helpers ----------------
__prompt_hostname() {
  [[ "${PROMPT_SHOW_HOSTNAME}" == "true" ]] || return
  printf '@%s' "$(hostname -s 2>/dev/null || hostname)"
}

__prompt_container() {
  [[ -n "${PROMPT_CONTAINER_TAG:-}" ]] || return
  printf '%s[%s]%s' "$BLUE" "$PROMPT_CONTAINER_TAG" "$RESET"
}

# ---------------- Prompt builder ----------------
__build_ps1() {
  local git branch

  git="$(__git_ps1 ' (%s)')"   # empty outside git repos

  PS1="$(__prompt_container)"
  PS1+="${GREEN}\u$(__prompt_hostname)${RESET}"
  PS1+=":${CYAN}\w${RESET}"
  PS1+="${YELLOW}${git}${RESET}"
  PS1+="\$ "
}

# ---------------- PROMPT_COMMAND hook ----------------
__append_prompt_command() {
  case ";$PROMPT_COMMAND;" in
    *";$1;"*) ;; # already present
    *)
      PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND;}$1"
      ;;
  esac
}

__append_prompt_command "__build_ps1"
