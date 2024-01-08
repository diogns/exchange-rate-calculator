import * as pulumi from '@pulumi/pulumi';

const stack = pulumi.getStack();

export function getTags(): { [key: string]: string } {
  return {
    Environment: stack.charAt(0).toUpperCase() + stack.slice(1),
  };
}
