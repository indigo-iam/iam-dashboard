// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type StatusProps = {
  active: boolean;
  autoHide?: boolean;
};

export default function Status(props: Readonly<StatusProps>) {
  const { active, autoHide } = props;
  const title = `${active ? "Active" : "Disabled"}`;
  return (
    <div
      title={title}
      className="data-[autohide=true]:bg-danger lg:data-[autohide=true]:text-danger data-[enabled=true]:data-[autohide=true]:bg-success lg:data-[autohide=true]:data-[enabled=true]:text-success text-danger data-[enabled=true]:text-success dark:bg-danger dark:data-[enabled=true]:bg-success dark:lg:data-[autohide=true]:data-[enabled=true]:bg-success dark:lg:data-[autohide=true]:data-[enabled=false]:bg-danger min-w-fit rounded-full bg-red-100 text-xs 
      
      px-2 py-0.5
      
      data-[autohide=true]:p-0 
      
  
     
     
     
      data-[autohide=true]:h-3 data-[autohide=true]:w-3 data-[enabled=true]:bg-green-100 lg:data-[autohide=true]:h-auto lg:data-[autohide=true]:min-w-fit lg:data-[autohide=true]:bg-red-100 lg:data-[autohide=true]:px-2 lg:data-[autohide=true]:py-0.5 lg:data-[enabled=true]:data-[autohide=true]:bg-green-100 dark:text-white dark:data-[enabled=true]:text-white dark:lg:data-[autohide=true]:data-[enabled=false]:text-white dark:lg:data-[autohide=true]:data-[enabled=true]:text-white"
      
      
      data-enabled={active}
      data-autohide={autoHide}
      aria-label={title}
    >
      <span
        className="inline-block data-[autohide=true]:hidden lg:data-[autohide=true]:inline-block"
        data-autohide={autoHide}
      >
        {title}
      </span>
    </div>
  );
}
